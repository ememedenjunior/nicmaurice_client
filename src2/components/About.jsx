import React from "react";
import Header from "./Header";
import Footer from "./Footer";
// import AboutImg from "../assets/about.jpg";

const About = () => {
  return (
    <>
      <Header />
      <h1 className="text-[35px] lg:text-[40px] ml-[30px] lg:ml-[300px] font-bold mt-[10px]">
        About Us
      </h1>

      {/* <img src={AboutImg} alt="" className="w-[400px] h-[400px]" /> */}
      <p className="text-blue-600 ml-[30px] lg:ml-[300px] mt-[30px] font-bold text-[20px]">
        Nic Maurice College of Health, Management, Sciences, and Technology Ltd:
        <br />{" "}
        <span className="text-[12px] lg:text-[14px]">
          A Beacon of Innovation and Change
        </span>
      </p>

      <div className="lg:flex lg:items-center lg:justify-between">
        <div className=" w-[300px] ml-[30px] lg:w-[500px] lg:ml-[300px] mb-[60px] font-mono">
          <p className="mt-[25px]">
            Nic Maurice College of Health, Management, Sciences, and Technology
            Ltd. (NMCHMST) stands as a testament to the transformative power of
            education. Founded in 2017, NMCHMST is not merely an institution of
            learning, but a vibrant hub of innovation, fostering a culture of
            excellence, collaboration, and social responsibility. Our vision
            extends beyond traditional academic boundaries, encompassing a
            commitment to empowering students to become leaders, innovators, and
            changemakers, not only in their chosen fields but also in the
            broader global community.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            A Foundation Built on Innovation and Vision:
          </h1>
          <p className="mt-[4px]">
            NMCHMST embraces a holistic approach to education, recognizing the
            interconnectedness of knowledge and the need for a future-forward
            curriculum. Our vision is guided by the following principles:
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Transformative Learning Experiences:
          </h1>
          <p className="mt-[4px]">
            We believe in active learning, where students are challenged to
            think critically, solve real-world problems, and contribute to
            meaningful research initiatives. We foster a culture of inquiry,
            where students are encouraged to ask questions, explore diverse
            perspectives, and challenge conventional thinking.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            A Global Perspective:
          </h1>
          <p className="mt-[4px]">
            In a world increasingly interconnected, we prepare students to
            thrive in a globalized marketplace. We offer international
            collaborations, dual-degree programs, and language proficiency
            programs to broaden horizons and foster cultural understanding.
            Students are encouraged to engage with diverse cultures, learn from
            global best practices, and develop a global mindset.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Industry-Ready Graduates:
          </h1>
          <p className="mt-[15px]">
            We prioritize hands-on experience, industry partnerships, and
            internship opportunities to bridge the gap between theory and
            practice. Our curriculum is designed in close consultation with
            industry leaders, ensuring students are equipped with the skills and
            knowledge employers demand.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Social Responsibility and Impact:
          </h1>
          <p className="mt-[15px]">
            We cultivate a sense of civic responsibility and encourage students
            to contribute to a more sustainable and equitable world. We
            integrate community engagement, ethical leadership, and impactful
            research into our curriculum, empowering students to become agents
            of positive change.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Core Pillars: A Tapestry of Excellence:
          </h1>
          <p className="mt-[12px]">
            NMCHMST is built on a foundation of four core pillars, each
            representing a crucial dimension of our mission:
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            1. Health: Shaping a Healthier Future:
          </h1>
          <p className="mt-[12px]">
            Beyond Healthcare: A Holistic Approach: We go beyond traditional
            healthcare training, emphasizing the interconnectedness of health,
            wellness, and social determinants of health. Our programs prepare
            students to become leaders in public health, preventative care, and
            community engagement. Students are equipped to address health
            disparities, promote healthy lifestyles, and advocate for equitable
            access to healthcare.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Innovating for a Sustainable Future:
          </h1>
          <p className="mt-[12px]">
            We invest in cutting-edge technology, including immersive simulation
            centers, advanced diagnostic equipment, and telemedicine platforms,
            to prepare students for the future of healthcare. Our programs
            integrate artificial intelligence, data analytics, and other
            emerging technologies to enhance patient care and improve healthcare
            outcomes.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Empowering Health Professionals:
          </h1>
          <p className="mt-[12px]">
            We foster a culture of ethical and compassionate care, encouraging
            students to become advocates for patient rights and to contribute to
            a more equitable healthcare system. Students are instilled with a
            strong sense of professionalism, empathy, and a commitment to
            providing holistic, patient-centered care.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            2. Management: Leading with Purpose and Innovation:
          </h1>
          <p className="mt-[12px]">
            Beyond Business: A Global Perspective: We prepare future leaders to
            navigate the complexities of a globalized marketplace, equipping
            them with the critical thinking, communication, and ethical
            decision-making skills needed for successful leadership. Our
            programs emphasize cross-cultural competency, negotiation skills,
            and the ability to work effectively in diverse and multicultural
            teams.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Developing Entrepreneurial Leaders:
          </h1>
          <p className="mt-[12px]">
            We cultivate an entrepreneurial spirit, encouraging students to
            develop innovative business models, embrace digital transformation,
            and contribute to economic growth. Students are provided with
            opportunities to develop business plans, participate in startup
            competitions, and gain practical experience in entrepreneurship.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Social Impact at the Forefront:
          </h1>
          <p className="mt-[12px]">
            We empower future managers to embrace sustainability, social
            responsibility, and ethical practices in their decision-making,
            contributing to a more equitable and sustainable future. Our
            curriculum integrates topics like corporate social responsibility,
            environmental sustainability, and ethical leadership, preparing
            students to lead with purpose and impact.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            3. Sciences: Fostering Scientific Inquiry and Discovery:
          </h1>
          <h1 className="font-mono mt-[20px] font-bold">
            Transdisciplinary Collaboration:
          </h1>
          <p className="mt-[12px]">
            We encourage interdisciplinary collaboration across scientific
            fields, recognizing the interconnectedness of knowledge and the need
            for innovative solutions to global challenges. We promote
            cross-disciplinary projects and research collaborations, fostering a
            culture of scientific inquiry and discovery.
          </p>

          <h1 className="font-mono mt-[20px] font-bold">
            Research for a Sustainable Future:
          </h1>
          <p className="mt-[17px]">
            We prioritize research that addresses pressing global issues like
            climate change, food security, and disease prevention, empowering
            students to become agents of change.
          </p>
        </div>

        <div className="w-[300px] lg:w-[500px] ml-[30px] mb-[60px] font-mono mr-[500px]">
          <p className="mt-[12px]">
            We prioritize research that addresses pressing global issues like
            climate change, food security, and disease prevention, empowering
            students to become agents of change. Our research centers are
            focused on developing solutions to real-world problems, utilizing
            cutting-edge technologies and methodologies.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Open Science and Knowledge Sharing:
          </h1>
          <p className="mt-[12px]">
            We promote a culture of open science, encouraging knowledge sharing,
            collaborative research, and the dissemination of research findings
            to contribute to a global body of knowledge. Students are encouraged
            to publish their research, present at conferences, and engage in
            knowledge transfer activities.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            4. Technology: Shaping the Digital Future:
          </h1>
          <p className="mt-[12px]">
            Beyond Coding: Ethics and Impact: We go beyond technical skills,
            emphasizing the ethical implications of technology and encouraging
            students to develop solutions that benefit society. Students are
            equipped to understand the social, ethical, and environmental impact
            of emerging technologies and to develop solutions that address
            real-world challenges.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Developing Future Tech Leaders:
          </h1>
          <p className="mt-[12px]">
            We equip students with the skills to navigate the evolving landscape
            of artificial intelligence, cybersecurity, data analytics, and other
            emerging technologies. Our curriculum integrates hands-on experience
            with the latest technologies, providing students with the practical
            skills they need to succeed in the digital economy.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Innovation for Social Good:
          </h1>
          <p className="mt-[12px]">
            We encourage students to use technology for social impact,
            developing solutions that address global challenges, improve access
            to information, and empower marginalized communities. Students are
            encouraged to participate in hackathons, develop social impact
            projects, and leverage technology to create a more equitable and
            inclusive world.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            A Culture of Innovation and Collaboration:
          </h1>
          <h1 className="font-mono mt-[20px] font-bold">
            NMCHMST fosters a vibrant learning environment where students are
            encouraged to:
          </h1>
          <h1 className="font-mono mt-[20px] font-bold">
            Embrace Curiosity and Experimentation:
          </h1>
          <p className="mt-[12px]">
            We encourage students to ask challenging questions, conduct
            research, and develop innovative solutions to real-world problems.
            We provide opportunities for students to explore their passions,
            experiment with new ideas, and take intellectual risks.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Collaborate and Create:
          </h1>
          <p className="mt-[12px]">
            We foster a culture of collaboration, where students work in teams,
            share ideas, and learn from each other's diverse perspectives. We
            encourage cross-disciplinary projects, team-based learning, and the
            sharing of knowledge and expertise.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Embrace Technology for Learning:
          </h1>
          <p className="mt-[12px]">
            We leverage cutting-edge technologies to enhance learning, provide
            personalized feedback, and create immersive learning experiences.
            Our classrooms are equipped with the latest technologies, and
            students are encouraged to utilize digital tools and platforms to
            enhance their learning.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Contribute to the Global Community:
          </h1>
          <p className="mt-[12px]">
            We encourage students to engage in community service, participate in
            international exchange programs, and make a positive impact on the
            world. We promote a culture of social responsibility and encourage
            students to give back to their communities.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            A Distinctive Approach:
          </h1>
          <h1 className="font-mono mt-[20px] font-bold">
            NMCHMST sets itself apart through:
          </h1>
          <p className="mt-[12px]">
            Personalized Learning Journeys: We guide students through tailored
            learning paths, taking into account their individual strengths,
            interests, and career aspirations. Our approach emphasizes
            personalized learning, allowing students to customize their
            educational experience to meet their unique needs and goals.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Globalized Curricula:
          </h1>
          <p className="mt-[12px]">
            We offer dual-degree programs and international exchange
            opportunities, providing students with a global perspective and
            diverse skillsets. We encourage students to study abroad,
            participate in international research collaborations, and gain
            experience in global organizations.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Community Engagement:
          </h1>
          <p className="mt-[12px]">
            Students actively participate in community-based projects,
            addressing local challenges and fostering a sense of social
            responsibility. We encourage students to engage with their
            communities, volunteer their time and skills, and make a positive
            impact on their surroundings.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Entrepreneurship and Social Impact:
          </h1>
          <p className="mt-[12px]">
            We encourage students to develop innovative solutions that address
            social issues and contribute to a sustainable future. We provide
            support for student entrepreneurs, offer incubation programs, and
            encourage the development of socially responsible business ventures.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            The Future of Education is Here:
          </h1>
          <p className="mt-[12px]">
            NMCHMST is a place where the future of education is being shaped. We
            are a place where students are not just taught but empowered to
            become leaders, innovators, and changemakers, transforming not only
            their lives but also the world around them. With your vision, Nic,
            and the dedication of the Board of Trustees, NMCHMST is poised to
            become a leading institution, setting the standard for higher
            education in Nigeria and beyond.
          </p>
          <h1 className="font-mono mt-[20px] font-bold">
            Hon. Nic Maurice <br />
            Chairman BOT.
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
