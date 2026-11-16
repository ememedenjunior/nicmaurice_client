// Quick-action panel bodies for the student and teacher dashboards.
// Every panel loads its data from the backend (/academics/*) and writes back
// through it, so what students and lecturers see is always the same data.
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaFilePdf, FaVideo, FaLink, FaFileAlt, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import api, { errorMessage } from "../utils/api";

const CURRENCY = import.meta.env.VITE_CURRENCY || "₦";
const money = (n) => `${CURRENCY}${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const todayName = () => DAYS[(new Date().getDay() + 6) % 7];
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "-");
const fmtDateTime = (d) => (d ? new Date(d).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "-");
const isoToday = () => new Date().toISOString().slice(0, 10);

/* ------------------------------- shared bits ------------------------------- */
const useTheme = (dark) =>
  useMemo(
    () => ({
      h: `text-lg font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`,
      row: `p-3 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`,
      title: `font-medium ${dark ? "text-white" : "text-gray-900"}`,
      sub: `text-sm ${dark ? "text-gray-400" : "text-gray-500"}`,
      input: `w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`,
      btn: "px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50",
      ghost: `px-3 py-2 rounded-lg border text-sm font-medium ${dark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`,
    }),
    [dark],
  );

function useApi(url, params) {
  const key = JSON.stringify(params || {});
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const load = useCallback(async () => {
    if (!url) return;
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const { data } = await api.get(url, { params: JSON.parse(key) });
      setState({ data, loading: false, error: "" });
    } catch (e) {
      setState({ data: null, loading: false, error: errorMessage(e, "Could not load this section") });
    }
  }, [url, key]);
  useEffect(() => {
    load();
  }, [load]);
  return { ...state, reload: load };
}

function useFlash() {
  const [flash, setFlash] = useState(null);
  useEffect(() => {
    if (!flash) return undefined;
    const t = setTimeout(() => setFlash(null), 3500);
    return () => clearTimeout(t);
  }, [flash]);
  const view = flash && (
    <div className={`mb-4 px-3 py-2 rounded-lg text-sm ${flash.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
      {flash.text}
    </div>
  );
  return [view, (text, ok = true) => setFlash({ text, ok })];
}

// Runs a request, reports the outcome, and refreshes the list on success.
function useAction(setFlash, reload) {
  const [busy, setBusy] = useState(false);
  const run = async (fn, okText) => {
    setBusy(true);
    try {
      await fn();
      if (okText) setFlash(okText, true);
      await reload?.();
      return true;
    } catch (e) {
      setFlash(errorMessage(e, "That did not work. Please try again."), false);
      return false;
    } finally {
      setBusy(false);
    }
  };
  return [busy, run];
}

const Loading = () => <p className="text-sm text-gray-500">Loading…</p>;
const ErrorBox = ({ text, onRetry }) => (
  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
    {text}{" "}
    <button className="underline font-medium" onClick={onRetry}>Try again</button>
  </div>
);
const Empty = ({ t, children }) => <p className={`${t.sub} py-2`}>{children}</p>;

function Section({ t, title, children, right }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className={t.h}>{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

// Wraps a panel: loading / error / content
function Panel({ res, children }) {
  if (res.loading && !res.data) return <Loading />;
  if (res.error) return <ErrorBox text={res.error} onRetry={res.reload} />;
  return children(res.data);
}

const typeIcon = (type) =>
  type === "PDF" ? <FaFilePdf className="text-red-500" /> : type === "Video" ? <FaVideo className="text-purple-500" /> : type === "Link" ? <FaLink className="text-blue-500" /> : <FaFileAlt className="text-blue-500" />;

const CourseSelect = ({ t, courses, value, onChange }) => (
  <select className={t.input} value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="">Select a course…</option>
    {courses.map((c) => (
      <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
    ))}
  </select>
);

/* ============================== STUDENT PANELS ============================== */
function Materials({ t }) {
  const res = useApi("/academics/materials");
  return (
    <Panel res={res}>
      {({ materials }) =>
        !materials.length ? (
          <Empty t={t}>No materials yet. Your lecturers&apos; notes and resources will appear here.</Empty>
        ) : (
          <div className="space-y-3">
            {materials.map((m) => (
              <a key={m._id} href={m.url} target="_blank" rel="noopener noreferrer" className={`${t.row} flex items-center justify-between hover:opacity-90`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-white/60">{typeIcon(m.type)}</div>
                  <div className="min-w-0">
                    <div className={`${t.title} truncate`}>{m.title}</div>
                    <div className={t.sub}>{m.courseCode} • {m.type} • {fmtDate(m.createdAt)}</div>
                    {m.note && <div className={`${t.sub} truncate`}>{m.note}</div>}
                  </div>
                </div>
                <FaExternalLinkAlt className="text-gray-400 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        )
      }
    </Panel>
  );
}

function SlotRow({ t, s }) {
  return (
    <div className={`${t.row} flex items-center justify-between`}>
      <div>
        <div className={t.title}>{s.title || s.code}</div>
        <div className={t.sub}>{s.code} • {s.type}{s.room ? ` • ${s.room}` : ""}</div>
      </div>
      <div className={`${t.sub} text-right`}>{s.start} - {s.end}</div>
    </div>
  );
}

function OfficeHoursForStudent({ t, setFlash }) {
  const res = useApi("/academics/office-hours");
  const [busy, run] = useAction(setFlash, res.reload);
  const [topic, setTopic] = useState("");
  return (
    <Section t={t} title="Office hours">
      <Panel res={res}>
        {({ hours }) =>
          !hours.length ? (
            <Empty t={t}>Your lecturers have not published office hours yet.</Empty>
          ) : (
            <>
              <input className={`${t.input} mb-3`} placeholder="What would you like to discuss? (optional)" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} />
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h._id} className={`${t.row} flex items-center justify-between gap-2`}>
                    <div>
                      <div className={t.title}>{h.lecturerName || "Lecturer"} • {h.day}</div>
                      <div className={t.sub}>{h.start} - {h.end} • {h.location} • {h.booked}/{h.capacity} booked</div>
                    </div>
                    {h.mine ? (
                      <button className={t.ghost} disabled={busy} onClick={() => run(() => api.delete(`/academics/office-hours/${h._id}/book`), "Booking cancelled")}>Cancel</button>
                    ) : (
                      <button className={t.btn} disabled={busy || h.booked >= h.capacity} onClick={() => run(() => api.post(`/academics/office-hours/${h._id}/book`, { topic }), "Slot booked")}>
                        {h.booked >= h.capacity ? "Full" : "Book"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )
        }
      </Panel>
    </Section>
  );
}

function Schedule({ t, setFlash }) {
  const res = useApi("/academics/schedule");
  return (
    <div className="space-y-8">
      <Panel res={res}>
        {({ slots }) => {
          const today = slots.filter((s) => s.day === todayName());
          return (
            <>
              <Section t={t} title={`Today (${todayName()})`}>
                {today.length ? <div className="space-y-2">{today.map((s, i) => <SlotRow key={i} t={t} s={s} />)}</div> : <Empty t={t}>No classes today.</Empty>}
              </Section>
              <Section t={t} title="Weekly timetable">
                {!slots.length ? (
                  <Empty t={t}>Your lecturers have not set class times yet.</Empty>
                ) : (
                  DAYS.filter((d) => slots.some((s) => s.day === d)).map((d) => (
                    <div key={d} className="mb-4">
                      <div className={`${t.sub} font-semibold mb-1`}>{d}</div>
                      <div className="space-y-2">{slots.filter((s) => s.day === d).map((s, i) => <SlotRow key={i} t={t} s={s} />)}</div>
                    </div>
                  ))
                )}
              </Section>
            </>
          );
        }}
      </Panel>
      <OfficeHoursForStudent t={t} setFlash={setFlash} />
    </div>
  );
}

function Fees({ t }) {
  const res = useApi("/academics/fees");
  return (
    <Panel res={res}>
      {(d) =>
        !d.fees.length ? (
          <Empty t={t}>No charges have been added to your account yet.</Empty>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white">
              <div className="text-sm opacity-90">Outstanding balance</div>
              <div className="text-3xl font-bold">{money(d.balance)}</div>
              <div className="text-sm opacity-90 mt-1">
                {d.balance > 0 ? (d.nextDue ? `Next due ${fmtDate(d.nextDue)}` : "Pay at the bursary") : "You are fully paid up"}
              </div>
            </div>
            <Section t={t} title="Breakdown">
              <div className="space-y-2">
                {d.fees.map((f) => (
                  <div key={f._id} className={`${t.row} flex items-center justify-between`}>
                    <div>
                      <div className={t.title}>{f.item}</div>
                      <div className={t.sub}>Paid {money(f.paid)}{f.dueDate ? ` • due ${fmtDate(f.dueDate)}` : ""}</div>
                    </div>
                    <div className={`font-semibold ${f.balance ? "text-rose-500" : "text-green-500"}`}>{f.balance ? money(f.balance) : "Paid"}</div>
                  </div>
                ))}
              </div>
            </Section>
            <p className={t.sub}>Payments are confirmed by the bursary at the registrar&apos;s office; your balance updates once they record it.</p>
          </div>
        )
      }
    </Panel>
  );
}

function Grades({ t }) {
  const res = useApi("/academics/grades");
  const att = useApi("/academics/my-attendance");
  return (
    <div className="space-y-8">
      <Panel res={res}>
        {(d) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className={`${t.row} text-center`}>
                <div className="text-3xl font-bold text-emerald-500">{d.gpa ?? "-"}</div>
                <div className={t.sub}>GPA (4.0 scale)</div>
              </div>
              <div className={`${t.row} text-center`}>
                <div className="text-3xl font-bold text-blue-500">{d.courses.length}</div>
                <div className={t.sub}>Courses ({d.gradedCourses} graded)</div>
              </div>
            </div>
            <Section t={t} title="Courses">
              {!d.courses.length ? <Empty t={t}>Register for courses to see your progress here.</Empty> : (
                <div className="space-y-3">
                  {d.courses.map((c) => (
                    <div key={c.enrollmentId} className={t.row}>
                      <div className="flex justify-between">
                        <div className={t.title}>{c.code} - {c.name}</div>
                        <div className="font-bold text-emerald-500">{c.grade}</div>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-gray-300/50 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${c.progress || 0}%` }} />
                      </div>
                      <div className={t.sub}>{c.progress || 0}% complete</div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </>
        )}
      </Panel>
      <Section t={t} title="Attendance">
        <Panel res={att}>
          {({ courses }) => !courses.length ? <Empty t={t}>No attendance recorded yet.</Empty> : (
            <div className="space-y-2">
              {courses.map((c) => (
                <div key={c.courseId} className={`${t.row} flex justify-between`}>
                  <div className={t.title}>{c.code}</div>
                  <div className={t.sub}>
                    {c.rate === null ? "No sessions yet" : `${c.rate}% • ${c.present} present, ${c.late} late, ${c.absent} absent`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </Section>
    </div>
  );
}

function StudentAssignmentCard({ t, a, setFlash, reload }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(a.submission?.text || "");
  const [link, setLink] = useState(a.submission?.link || "");
  const [busy, run] = useAction(setFlash, reload);
  const sub = a.submission;
  const overdue = new Date(a.dueDate) < new Date();
  const locked = sub?.gradedAt || (overdue && !sub);
  return (
    <div className={t.row}>
      <div className="flex justify-between gap-2">
        <div>
          <div className={t.title}>{a.title}</div>
          <div className={t.sub}>{a.courseCode} • due {fmtDateTime(a.dueDate)} • {a.points} pts</div>
        </div>
        <div className="text-right text-sm shrink-0">
          {sub?.gradedAt ? <span className="font-bold text-emerald-500">{sub.score}/{a.points}</span> : sub ? <span className="text-blue-500">Submitted</span> : overdue ? <span className="text-red-500">Overdue</span> : <span className="text-amber-500">Pending</span>}
        </div>
      </div>
      {a.description && <p className={`${t.sub} mt-2 whitespace-pre-wrap`}>{a.description}</p>}
      {sub?.feedback && <p className="mt-2 text-sm text-emerald-600">Feedback: {sub.feedback}</p>}
      {!locked && (
        <div className="mt-3">
          {!open ? (
            <button className={t.btn} onClick={() => setOpen(true)}>{sub ? "Edit submission" : "Submit"}</button>
          ) : (
            <div className="space-y-2">
              <textarea className={t.input} rows={4} placeholder="Your answer" value={text} onChange={(e) => setText(e.target.value)} maxLength={8000} />
              <input className={t.input} placeholder="Link to your work (optional, https://…)" value={link} onChange={(e) => setLink(e.target.value)} />
              <div className="flex gap-2">
                <button className={t.btn} disabled={busy} onClick={async () => { if (await run(() => api.post(`/academics/assignments/${a._id}/submit`, { text, link }), "Submitted")) setOpen(false); }}>Send</button>
                <button className={t.ghost} onClick={() => setOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StudentAssignments({ t, setFlash }) {
  const res = useApi("/academics/assignments");
  return (
    <Panel res={res}>
      {({ assignments }) => {
        const pending = assignments.filter((a) => !a.submission);
        const done = assignments.filter((a) => a.submission);
        const list = (items) => <div className="space-y-3">{items.map((a) => <StudentAssignmentCard key={a._id} t={t} a={a} setFlash={setFlash} reload={res.reload} />)}</div>;
        return (
          <div className="space-y-6">
            <Section t={t} title={`To do (${pending.length})`}>{pending.length ? list(pending) : <Empty t={t}>Nothing due. Well done!</Empty>}</Section>
            <Section t={t} title={`Submitted (${done.length})`}>{done.length ? list(done) : <Empty t={t}>No submissions yet.</Empty>}</Section>
          </div>
        );
      }}
    </Panel>
  );
}

function Thread({ t, p, setFlash, reload, me }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [busy, run] = useAction(setFlash, reload);
  return (
    <div className={t.row}>
      <button className="w-full text-left" onClick={() => setOpen((o) => !o)}>
        <div className={t.title}>{p.title}</div>
        <div className={t.sub}>{p.courseCode} • {p.authorName}{p.authorRole === "teacher" ? " (lecturer)" : ""} • {p.replies.length} replies • {fmtDateTime(p.lastActivity)}</div>
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          <p className={`text-sm whitespace-pre-wrap ${t.sub}`}>{p.body}</p>
          {p.replies.map((r, i) => (
            <div key={i} className="pl-3 border-l-2 border-blue-400">
              <div className={t.sub}><b>{r.authorName}</b>{r.authorRole === "teacher" ? " (lecturer)" : ""} • {fmtDateTime(r.createdAt)}</div>
              <div className={`text-sm whitespace-pre-wrap ${t.title}`}>{r.body}</div>
            </div>
          ))}
          <div className="flex gap-2">
            <input className={t.input} placeholder="Write a reply…" value={body} onChange={(e) => setBody(e.target.value)} maxLength={2000} />
            <button className={t.btn} disabled={busy || !body.trim()} onClick={async () => { if (await run(() => api.post(`/academics/posts/${p._id}/replies`, { body }))) setBody(""); }}>Reply</button>
          </div>
          {p.authorId === me && <button className="text-xs text-red-500 underline" onClick={() => run(() => api.delete(`/academics/posts/${p._id}`), "Discussion deleted")}>Delete discussion</button>}
        </div>
      )}
    </div>
  );
}

function Announcements({ t }) {
  const res = useApi("/academics/announcements");
  return (
    <Panel res={res}>
      {({ announcements }) => !announcements.length ? <Empty t={t}>No announcements.</Empty> : (
        <div className="space-y-2">
          {announcements.map((a) => (
            <div key={a._id} className={t.row} onClick={() => !a.read && api.post(`/academics/announcements/${a._id}/read`).then(res.reload).catch(() => {})}>
              <div className="flex justify-between">
                <div className={t.title}>{!a.read && <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2" />}{a.title}</div>
                <div className={t.sub}>{a.courseCode}</div>
              </div>
              <div className={`text-sm whitespace-pre-wrap ${t.sub}`}>{a.body}</div>
              <div className={`${t.sub} text-xs mt-1`}>{a.from} • {fmtDateTime(a.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function Community({ t, courses, setFlash, me }) {
  const res = useApi("/academics/posts");
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, run] = useAction(setFlash, res.reload);
  return (
    <div className="space-y-8">
      <Section t={t} title="Start a discussion">
        <div className="space-y-2">
          <CourseSelect t={t} courses={courses} value={courseId} onChange={setCourseId} />
          <input className={t.input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} />
          <textarea className={t.input} rows={3} placeholder="What would you like to ask or share?" value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} />
          <button className={t.btn} disabled={busy || !courseId || !title.trim() || !body.trim()} onClick={async () => { if (await run(() => api.post("/academics/posts", { courseId, title, body }), "Posted")) { setTitle(""); setBody(""); } }}>Post</button>
        </div>
      </Section>
      <Section t={t} title="Course discussions">
        <Panel res={res}>
          {({ posts }) => !posts.length ? <Empty t={t}>No discussions yet. Be the first to start one.</Empty> : (
            <div className="space-y-2">{posts.map((p) => <Thread key={p._id} t={t} p={p} setFlash={setFlash} reload={res.reload} me={me} />)}</div>
          )}
        </Panel>
      </Section>
      <Section t={t} title="Announcements"><Announcements t={t} /></Section>
    </div>
  );
}

export function StudentQuickAction({ id, dark, courses = [], studentId }) {
  const t = useTheme(dark);
  const [flashView, setFlash] = useFlash();
  const list = courses.map((c) => ({ id: c.courseId || c._id || c.id, code: c.code, name: c.name || c.title }));
  return (
    <div>
      {flashView}
      {id === "course-materials" && <Materials t={t} />}
      {id === "class-schedule" && <Schedule t={t} setFlash={setFlash} />}
      {id === "tuition-fees" && <Fees t={t} />}
      {id === "grades-progress" && <Grades t={t} />}
      {id === "assignments" && <StudentAssignments t={t} setFlash={setFlash} />}
      {id === "student-community" && <Community t={t} courses={list} setFlash={setFlash} me={studentId} />}
    </div>
  );
}

/* ============================== TEACHER PANELS ============================== */
function ScheduleEditor({ t, course, setFlash, reload }) {
  const [slots, setSlots] = useState(course.schedule || []);
  const [busy, run] = useAction(setFlash, reload);
  const set = (i, k, v) => setSlots((s) => s.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  return (
    <div className="mt-3 space-y-2">
      {slots.map((s, i) => (
        <div key={i} className="grid grid-cols-6 gap-1">
          <select className={`${t.input} col-span-2`} value={s.day} onChange={(e) => set(i, "day", e.target.value)}>
            {DAYS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <input type="time" className={t.input} value={s.start} onChange={(e) => set(i, "start", e.target.value)} />
          <input type="time" className={t.input} value={s.end} onChange={(e) => set(i, "end", e.target.value)} />
          <input className={t.input} placeholder="Room" value={s.room || ""} onChange={(e) => set(i, "room", e.target.value)} />
          <button className="text-red-500" aria-label="Remove slot" onClick={() => setSlots((x) => x.filter((_, j) => j !== i))}><FaTrash /></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button className={t.ghost} onClick={() => setSlots((s) => [...s, { day: "Monday", start: "09:00", end: "10:00", room: "", type: "Lecture" }])}>Add class time</button>
        <button className={t.btn} disabled={busy} onClick={() => run(() => api.put(`/academics/courses/${course._id}/schedule`, { schedule: slots }), "Schedule saved")}>Save schedule</button>
      </div>
    </div>
  );
}

function MaterialsManager({ t, course, setFlash }) {
  const res = useApi("/academics/materials", { courseId: course._id });
  const [busy, run] = useAction(setFlash, res.reload);
  const [f, setF] = useState({ title: "", url: "", type: "Link" });
  return (
    <div className="mt-3 space-y-2">
      <Panel res={res}>
        {({ materials }) => materials.map((m) => (
          <div key={m._id} className="flex items-center justify-between text-sm">
            <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline truncate">{m.title} ({m.type})</a>
            <button className="text-red-500 ml-2" aria-label="Delete material" onClick={() => run(() => api.delete(`/academics/materials/${m._id}`), "Material removed")}><FaTrash /></button>
          </div>
        ))}
      </Panel>
      <div className="grid grid-cols-6 gap-1">
        <input className={`${t.input} col-span-2`} placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} maxLength={160} />
        <input className={`${t.input} col-span-2`} placeholder="https://…" value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} />
        <select className={t.input} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
          {["Link", "PDF", "Video", "Slides", "Document"].map((x) => <option key={x}>{x}</option>)}
        </select>
        <button className={t.btn} disabled={busy || !f.title.trim() || !f.url.trim()} onClick={async () => { if (await run(() => api.post("/academics/materials", { courseId: course._id, ...f }), "Material added")) setF({ title: "", url: "", type: f.type }); }}>Add</button>
      </div>
    </div>
  );
}

function MyCourses({ t, courses, setFlash, reloadCourses }) {
  const [openId, setOpenId] = useState(null);
  const [tab, setTab] = useState("schedule");
  if (!courses.length) return <Empty t={t}>You have not been assigned any courses yet. The registrar assigns courses to lecturers.</Empty>;
  return (
    <div className="space-y-3">
      {courses.map((c) => (
        <div key={c._id} className={t.row}>
          <button className="w-full text-left flex justify-between" onClick={() => setOpenId(openId === c._id ? null : c._id)}>
            <div>
              <div className={t.title}>{c.code} - {c.title || c.name}</div>
              <div className={t.sub}>{c.enrolledCount ?? c.enrolled ?? 0}/{c.capacity} students • {c.units} units • {c.semester}</div>
            </div>
            <span className={t.sub}>{openId === c._id ? "Hide" : "Manage"}</span>
          </button>
          {openId === c._id && (
            <>
              <div className="flex gap-2 mt-3">
                {["schedule", "materials"].map((k) => (
                  <button key={k} className={tab === k ? t.btn : t.ghost} onClick={() => setTab(k)}>{k === "schedule" ? "Class times" : "Materials"}</button>
                ))}
              </div>
              {tab === "schedule" ? <ScheduleEditor t={t} course={c} setFlash={setFlash} reload={reloadCourses} /> : <MaterialsManager t={t} course={c} setFlash={setFlash} />}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function SubmissionRow({ t, s, max, setFlash, reload }) {
  const [score, setScore] = useState(s.score ?? "");
  const [feedback, setFeedback] = useState(s.feedback || "");
  const [busy, run] = useAction(setFlash, reload);
  return (
    <div className={t.row}>
      <div className="flex justify-between">
        <div className={t.title}>{s.studentName}</div>
        <div className={t.sub}>{s.gradedAt ? `Graded ${s.score}/${max}` : "Not graded"}</div>
      </div>
      {s.text && <p className={`text-sm whitespace-pre-wrap mt-1 ${t.sub}`}>{s.text}</p>}
      {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 underline">Open linked work</a>}
      <div className="grid grid-cols-6 gap-1 mt-2">
        <input type="number" min="0" max={max} className={t.input} placeholder={`/${max}`} value={score} onChange={(e) => setScore(e.target.value)} />
        <input className={`${t.input} col-span-4`} placeholder="Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} maxLength={2000} />
        <button className={t.btn} disabled={busy || score === ""} onClick={() => run(() => api.put(`/academics/submissions/${s._id}/grade`, { score: Number(score), feedback }), "Grade saved")}>Save</button>
      </div>
    </div>
  );
}

function SubmissionsView({ t, a, onBack, setFlash }) {
  const res = useApi(`/academics/assignments/${a._id}/submissions`);
  return (
    <div className="space-y-3">
      <button className={t.ghost} onClick={onBack}>← Back</button>
      <h3 className={t.h}>{a.courseCode} • {a.title}</h3>
      <Panel res={res}>
        {({ submissions }) => !submissions.length ? <Empty t={t}>No submissions yet.</Empty> : submissions.map((s) => <SubmissionRow key={s._id} t={t} s={s} max={a.points} setFlash={setFlash} reload={res.reload} />)}
      </Panel>
    </div>
  );
}

function TeacherAssignments({ t, courses, setFlash }) {
  const res = useApi("/academics/assignments");
  const [busy, run] = useAction(setFlash, res.reload);
  const [view, setView] = useState(null);
  const [f, setF] = useState({ courseId: "", title: "", description: "", dueDate: "", points: 100 });
  if (view) return <SubmissionsView t={t} a={view} onBack={() => { setView(null); res.reload(); }} setFlash={setFlash} />;
  return (
    <div className="space-y-8">
      <Section t={t} title="New assignment">
        <div className="space-y-2">
          <CourseSelect t={t} courses={courses} value={f.courseId} onChange={(v) => setF({ ...f, courseId: v })} />
          <input className={t.input} placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} maxLength={160} />
          <textarea className={t.input} rows={3} placeholder="Instructions" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} maxLength={4000} />
          <div className="grid grid-cols-2 gap-2">
            <input type="datetime-local" className={t.input} value={f.dueDate} onChange={(e) => setF({ ...f, dueDate: e.target.value })} />
            <input type="number" min="1" max="1000" className={t.input} value={f.points} onChange={(e) => setF({ ...f, points: e.target.value })} />
          </div>
          <button className={t.btn} disabled={busy || !f.courseId || !f.title.trim() || !f.dueDate} onClick={async () => { if (await run(() => api.post("/academics/assignments", { ...f, dueDate: new Date(f.dueDate).toISOString() }), "Assignment created")) setF({ ...f, title: "", description: "", dueDate: "" }); }}>Create</button>
        </div>
      </Section>
      <Section t={t} title="Your assignments">
        <Panel res={res}>
          {({ assignments }) => !assignments.length ? <Empty t={t}>No assignments yet.</Empty> : (
            <div className="space-y-2">
              {assignments.map((a) => (
                <div key={a._id} className={`${t.row} flex items-center justify-between gap-2`}>
                  <button className="text-left flex-1" onClick={() => setView(a)}>
                    <div className={t.title}>{a.title}</div>
                    <div className={t.sub}>{a.courseCode} • due {fmtDateTime(a.dueDate)} • {a.submitted} submitted, {a.graded} graded</div>
                  </button>
                  <button className="text-red-500" aria-label="Delete assignment" onClick={() => window.confirm("Delete this assignment and its submissions?") && run(() => api.delete(`/academics/assignments/${a._id}`), "Assignment deleted")}><FaTrash /></button>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </Section>
    </div>
  );
}

function RosterRow({ t, r, setFlash }) {
  const [grade, setGrade] = useState(r.grade);
  const [progress, setProgress] = useState(r.progress ?? 0);
  const [busy, run] = useAction(setFlash);
  return (
    <div className={`${t.row} grid grid-cols-6 gap-1 items-center`}>
      <div className="col-span-2 min-w-0">
        <div className={`${t.title} truncate`}>{r.name}</div>
        <div className={t.sub}>{r.studentId}</div>
      </div>
      <select className={t.input} value={grade} onChange={(e) => setGrade(e.target.value)}>
        {["In Progress", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"].map((g) => <option key={g}>{g}</option>)}
      </select>
      <input type="number" min="0" max="100" className={t.input} value={progress} onChange={(e) => setProgress(e.target.value)} aria-label="Progress %" />
      <button className={t.btn} disabled={busy} onClick={() => run(() => api.put(`/academics/enrollments/${r.enrollmentId}/grade`, { grade, progress: Number(progress) }), "Saved")}>Save</button>
    </div>
  );
}

function Grading({ t, courses, setFlash }) {
  const [courseId, setCourseId] = useState("");
  const res = useApi(courseId ? `/academics/courses/${courseId}/roster` : null);
  return (
    <div className="space-y-3">
      <CourseSelect t={t} courses={courses} value={courseId} onChange={setCourseId} />
      {courseId && (
        <>
          <div className={`${t.sub} grid grid-cols-6 gap-1 px-3`}><span className="col-span-2">Student</span><span>Grade</span><span>Progress %</span><span /></div>
          <Panel res={res}>
            {({ roster }) => !roster.length ? <Empty t={t}>No students are enrolled yet.</Empty> : roster.map((r) => <RosterRow key={r.enrollmentId} t={t} r={r} setFlash={setFlash} />)}
          </Panel>
        </>
      )}
    </div>
  );
}

const STATUSES = ["present", "late", "absent", "excused"];
function AttendanceSheet({ t, courseId, date, setFlash }) {
  const roster = useApi(`/academics/courses/${courseId}/roster`);
  const saved = useApi(`/academics/courses/${courseId}/attendance`, { date });
  const summary = useApi(`/academics/courses/${courseId}/attendance/summary`);
  const [marks, setMarks] = useState({});
  const [busy, run] = useAction(setFlash, async () => { await saved.reload(); await summary.reload(); });
  useEffect(() => {
    const m = {};
    (saved.data?.records || []).forEach((r) => { m[r.student] = r.status; });
    setMarks(m);
  }, [saved.data]);
  const rows = roster.data?.roster || [];
  const markAll = (status) => setMarks(Object.fromEntries(rows.map((r) => [r.studentId, status])));
  return (
    <div className="space-y-6">
      <Panel res={roster}>
        {() => !rows.length ? <Empty t={t}>No students are enrolled yet.</Empty> : (
          <>
            <div className="flex items-center justify-between">
              <span className={t.sub}>{saved.data?.taken ? "Attendance already taken. Editing it." : "Not taken yet"}</span>
              <button className={t.ghost} onClick={() => markAll("present")}>All present</button>
            </div>
            <div className="space-y-2">
              {rows.map((r) => (
                <div key={r.studentId} className={`${t.row} flex items-center justify-between gap-2`}>
                  <div className={`${t.title} truncate`}>{r.name}</div>
                  <div className="flex gap-1">
                    {STATUSES.map((s) => (
                      <button key={s} onClick={() => setMarks((m) => ({ ...m, [r.studentId]: s }))} className={`px-2 py-1 rounded text-xs capitalize ${marks[r.studentId] === s ? (s === "absent" ? "bg-red-500 text-white" : "bg-green-600 text-white") : t.ghost}`}>{s}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className={t.btn} disabled={busy || !Object.keys(marks).length} onClick={() => run(() => api.post(`/academics/courses/${courseId}/attendance`, { date, records: Object.entries(marks).map(([student, status]) => ({ student, status })) }), "Attendance saved")}>Save attendance</button>
          </>
        )}
      </Panel>
      <Section t={t} title="Attendance rates">
        <Panel res={summary}>
          {({ sessions, students }) => !sessions ? <Empty t={t}>No sessions recorded yet.</Empty> : (
            <div className="space-y-2">
              <div className={t.sub}>{sessions} session(s) recorded</div>
              {students.map((s) => (
                <div key={s.studentId} className={`${t.row} flex justify-between`}>
                  <div className={t.title}>{s.name}</div>
                  <div className={`text-sm font-medium ${s.rate !== null && s.rate < 75 ? "text-red-500" : "text-green-600"}`}>{s.rate === null ? "-" : `${s.rate}%`} ({s.absent} absent)</div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </Section>
    </div>
  );
}

function Attendance({ t, courses, setFlash }) {
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState(isoToday());
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <CourseSelect t={t} courses={courses} value={courseId} onChange={setCourseId} />
        <input type="date" className={t.input} value={date} max={isoToday()} onChange={(e) => setDate(e.target.value)} />
      </div>
      {courseId && date && <AttendanceSheet key={`${courseId}${date}`} t={t} courseId={courseId} date={date} setFlash={setFlash} />}
    </div>
  );
}

function OfficeHours({ t, setFlash }) {
  const res = useApi("/academics/office-hours");
  const [busy, run] = useAction(setFlash, res.reload);
  const [f, setF] = useState({ day: "Monday", start: "14:00", end: "16:00", location: "Office", capacity: 6 });
  return (
    <div className="space-y-8">
      <Section t={t} title="Add a slot">
        <div className="grid grid-cols-6 gap-1">
          <select className={`${t.input} col-span-2`} value={f.day} onChange={(e) => setF({ ...f, day: e.target.value })}>{DAYS.slice(0, 6).map((d) => <option key={d}>{d}</option>)}</select>
          <input type="time" className={t.input} value={f.start} onChange={(e) => setF({ ...f, start: e.target.value })} />
          <input type="time" className={t.input} value={f.end} onChange={(e) => setF({ ...f, end: e.target.value })} />
          <input type="number" min="1" max="50" className={t.input} value={f.capacity} onChange={(e) => setF({ ...f, capacity: e.target.value })} aria-label="Capacity" />
          <input className={`${t.input} col-span-4`} placeholder="Location" value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} maxLength={80} />
          <button className={`${t.btn} col-span-2`} disabled={busy} onClick={() => run(() => api.post("/academics/office-hours", f), "Slot added")}>Add slot</button>
        </div>
      </Section>
      <Section t={t} title="Your office hours">
        <Panel res={res}>
          {({ hours }) => !hours.length ? <Empty t={t}>No office hours yet.</Empty> : (
            <div className="space-y-3">
              {hours.map((h) => (
                <div key={h._id} className={t.row}>
                  <div className="flex justify-between">
                    <div>
                      <div className={t.title}>{h.day} • {h.start} - {h.end}</div>
                      <div className={t.sub}>{h.location} • {h.booked}/{h.capacity} booked</div>
                    </div>
                    <button className="text-red-500" aria-label="Delete slot" onClick={() => window.confirm("Delete this slot and its bookings?") && run(() => api.delete(`/academics/office-hours/${h._id}`), "Slot deleted")}><FaTrash /></button>
                  </div>
                  {h.bookings.map((b) => (
                    <div key={b.student} className="flex justify-between text-sm mt-2">
                      <span className={t.title}>{b.studentName || b.student}{b.topic ? ` - ${b.topic}` : ""}</span>
                      <button className="text-red-500 underline" onClick={() => run(() => api.delete(`/academics/office-hours/${h._id}/book`, { params: { student: b.student } }), "Booking removed")}>Remove</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </Panel>
      </Section>
    </div>
  );
}

function Communications({ t, courses, setFlash }) {
  const res = useApi("/academics/announcements");
  const [busy, run] = useAction(setFlash, res.reload);
  const [f, setF] = useState({ courseId: "", title: "", body: "", priority: "medium" });
  return (
    <div className="space-y-8">
      <Section t={t} title="Message your class">
        <div className="space-y-2">
          <CourseSelect t={t} courses={courses} value={f.courseId} onChange={(v) => setF({ ...f, courseId: v })} />
          <input className={t.input} placeholder="Subject" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} maxLength={160} />
          <textarea className={t.input} rows={3} placeholder="Message to all students in the course" value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} maxLength={4000} />
          <div className="flex gap-2">
            <select className={t.input} value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value })}>{["low", "medium", "high"].map((p) => <option key={p}>{p}</option>)}</select>
            <button className={t.btn} disabled={busy || !f.courseId || !f.title.trim() || !f.body.trim()} onClick={async () => { if (await run(() => api.post("/academics/announcements", f), "Message sent")) setF({ ...f, title: "", body: "" }); }}>Send</button>
          </div>
        </div>
      </Section>
      <Section t={t} title="Messages & announcements">
        <Panel res={res}>
          {({ announcements }) => !announcements.length ? <Empty t={t}>Nothing yet.</Empty> : (
            <div className="space-y-2">
              {announcements.map((a) => (
                <div key={a._id} className={t.row} onClick={() => !a.read && api.post(`/academics/announcements/${a._id}/read`).then(res.reload).catch(() => {})}>
                  <div className="flex justify-between gap-2">
                    <div className={t.title}>{!a.read && <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2" />}{a.title}</div>
                    <span className={`text-xs ${a.priority === "high" ? "text-red-500" : t.sub}`}>{a.priority}</span>
                  </div>
                  <div className={`text-sm whitespace-pre-wrap ${t.sub}`}>{a.body}</div>
                  <div className={`${t.sub} text-xs mt-1`}>{a.mine ? "You" : a.from}{a.courseCode ? ` → ${a.courseCode}` : " → faculty"} • {fmtDateTime(a.createdAt)}</div>
                  {a.mine && <button className="text-xs text-red-500 underline mt-1" onClick={(e) => { e.stopPropagation(); run(() => api.delete(`/academics/announcements/${a._id}`), "Deleted"); }}>Delete</button>}
                </div>
              ))}
            </div>
          )}
        </Panel>
      </Section>
    </div>
  );
}

export function TeacherQuickAction({ id, dark, courses = [], reloadCourses }) {
  const t = useTheme(dark);
  const [flashView, setFlash] = useFlash();
  const list = courses.map((c) => ({ id: c._id || c.id, code: c.code, name: c.title || c.name }));
  return (
    <div>
      {flashView}
      {id === "my-courses" && <MyCourses t={t} courses={courses} setFlash={setFlash} reloadCourses={reloadCourses} />}
      {id === "student-assignments" && <TeacherAssignments t={t} courses={list} setFlash={setFlash} />}
      {id === "grade-management" && <Grading t={t} courses={list} setFlash={setFlash} />}
      {id === "attendance" && <Attendance t={t} courses={list} setFlash={setFlash} />}
      {id === "office-hours" && <OfficeHours t={t} setFlash={setFlash} />}
      {id === "faculty-communications" && <Communications t={t} courses={list} setFlash={setFlash} />}
    </div>
  );
}

/* ============================ DASHBOARD SIDEBARS ============================ */
// Small live widgets for the overview tab (replace the old sample-data cards).
const Mini = ({ dark, children }) => <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{children}</p>;

export function StudentDeadlines({ dark }) {
  const t = useTheme(dark);
  const res = useApi("/academics/assignments");
  if (res.loading && !res.data) return <Mini dark={dark}>Loading…</Mini>;
  if (res.error) return <Mini dark={dark}>{res.error}</Mini>;
  const items = res.data.assignments.filter((a) => !a.submission && new Date(a.dueDate) > new Date()).slice(0, 4);
  if (!items.length) return <Mini dark={dark}>No upcoming deadlines.</Mini>;
  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div key={a._id} className={`p-3 border-l-4 border-blue-500 rounded-r-lg ${dark ? "bg-gray-700/50" : "bg-blue-50/50"}`}>
          <div className={t.title}>{a.title}</div>
          <div className={t.sub}>{a.courseCode} • due {fmtDateTime(a.dueDate)}</div>
        </div>
      ))}
    </div>
  );
}

export function StudentRecent({ dark }) {
  const res = useApi("/academics/announcements");
  if (res.loading && !res.data) return <Mini dark={dark}>Loading…</Mini>;
  if (res.error) return <Mini dark={dark}>{res.error}</Mini>;
  const items = res.data.announcements.slice(0, 4);
  if (!items.length) return <Mini dark={dark}>Announcements from your lecturers will show up here.</Mini>;
  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div key={a._id} className="p-2">
          <p className={`font-medium ${dark ? "text-white" : "text-gray-900"}`}>{a.title}</p>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>{a.courseCode} • {a.from}</p>
          <p className="text-xs text-gray-400">{fmtDateTime(a.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}

export function TeacherPendingGrading({ dark, onOpen }) {
  const t = useTheme(dark);
  const res = useApi("/academics/assignments");
  if (res.loading && !res.data) return <Mini dark={dark}>Loading…</Mini>;
  if (res.error) return <Mini dark={dark}>{res.error}</Mini>;
  const items = res.data.assignments.filter((a) => a.submitted > a.graded);
  if (!items.length) return <Mini dark={dark}>Nothing waiting to be graded.</Mini>;
  return (
    <div className="space-y-3">
      {items.slice(0, 5).map((a) => (
        <div key={a._id} className={`p-3 border-l-4 border-amber-500 rounded-r-lg ${dark ? "bg-gray-700/50" : "bg-amber-50/50"}`}>
          <div className={t.title}>{a.courseCode} • {a.title}</div>
          <div className={t.sub}>{a.submitted - a.graded} to grade • due {fmtDate(a.dueDate)}</div>
          {onOpen && <button className="mt-1 text-sm text-blue-600 font-medium" onClick={onOpen}>Start grading →</button>}
        </div>
      ))}
    </div>
  );
}

export function TeacherToday({ dark }) {
  const t = useTheme(dark);
  const sched = useApi("/academics/schedule");
  const hours = useApi("/academics/office-hours");
  if ((sched.loading && !sched.data) || (hours.loading && !hours.data)) return <Mini dark={dark}>Loading…</Mini>;
  const day = todayName();
  const rows = [
    ...(sched.data?.slots || []).filter((s) => s.day === day).map((s) => ({ start: s.start, end: s.end, label: `${s.code} - ${s.title}`, where: s.room })),
    ...(hours.data?.hours || []).filter((h) => h.day === day).map((h) => ({ start: h.start, end: h.end, label: `Office hours (${h.booked} booked)`, where: h.location })),
  ].sort((a, b) => a.start.localeCompare(b.start));
  if (!rows.length) return <Mini dark={dark}>Nothing scheduled today.</Mini>;
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div key={i} className={`p-3 rounded-lg ${dark ? "bg-gray-700/50" : "bg-purple-50/50"}`}>
          <p className={t.title}>{r.start} - {r.end}</p>
          <p className={t.sub}>{r.label}</p>
          {r.where && <p className="text-xs text-gray-400">{r.where}</p>}
        </div>
      ))}
    </div>
  );
}

export function TeacherAlerts({ dark, courses = [] }) {
  const t = useTheme(dark);
  const [rows, setRows] = useState(null);
  const key = courses.map((c) => c._id).join(",");
  useEffect(() => {
    let off = false;
    (async () => {
      try {
        const all = await Promise.all(
          courses.map((c) => api.get(`/academics/courses/${c._id}/attendance/summary`).then((r) => r.data.students.filter((s) => s.rate !== null && s.rate < 75).map((s) => ({ ...s, code: c.code })))),
        );
        if (!off) setRows(all.flat());
      } catch {
        if (!off) setRows([]);
      }
    })();
    return () => { off = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  if (rows === null) return <Mini dark={dark}>Loading…</Mini>;
  if (!rows.length) return <Mini dark={dark}>No attendance concerns right now.</Mini>;
  return (
    <div className="space-y-3">
      {rows.slice(0, 6).map((s) => (
        <div key={`${s.code}${s.studentId}`} className={`p-3 rounded-lg flex items-center justify-between ${dark ? "bg-gray-800" : "bg-white"}`}>
          <div>
            <p className={t.title}>{s.name}</p>
            <p className={t.sub}>{s.absent} absences in {s.code}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.rate < 50 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{s.rate}%</span>
        </div>
      ))}
    </div>
  );
}
