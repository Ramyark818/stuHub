'use server';

// This file contains hardcoded data for the student dashboard and portfolio.
// In a real application, this data would be fetched from a database.

export const documents = [
    { name: "Bachelor of Science in Computer Science", type: "Education", status: "Approved", date: "2024-05-10" },
    { name: "React, Next.js, TypeScript, Node.js", type: "Skills", status: "Approved", date: "2024-10-01" },
    { name: "AI in Education, Hiking, Chess", type: "Interests", status: "Approved", date: "2024-10-01" },
    { name: "linkedin.com/in/demostudent", type: "LinkedIn", status: "Approved", date: "2024-10-01" },
    { name: "github.com/demostudent", type: "GitHub", status: "Approved", date: "2024-10-01" },
    { name: "'The Future of AI in Higher Education', J. of EdTech", type: "Publication", status: "Approved", date: "2024-07-15" },
    { name: "Summer Internship at TechCorp", type: "Internship", status: "Approved", date: "2024-09-01" },
    { name: "Advanced React Course", type: "Course", status: "Approved", date: "2024-10-25" },
    { name: "Hackathon Winner: Best Use of AI", type: "Achievement", status: "Approved", date: "2024-08-15" },
    { name: "Dean's List 2023", type: "Achievement", status: "Approved", date: "2023-12-20" },
    { name: "Community Food Bank App", type: "Project", status: "Approved", date: "2023-11-01" },
    { name: "Local Animal Shelter Volunteer", type: "Voluntary Work", status: "Approved", date: "2024-06-01" },
    { name: "Part-time work at Cafe", type: "Experience", status: "Rejected", date: "2024-07-20" },
    { name: "Minor in Economics", type: "Education", status: "Rejected", date: "2024-05-10" },
];

const approvedDocuments = documents.filter(doc => doc.status === 'Approved');

export const getStudentData = () => {
    const education = approvedDocuments.find(doc => doc.type === 'Education')?.name;
    const skills = approvedDocuments.find(doc => doc.type === 'Skills')?.name.split(', ');
    const interests = approvedDocuments.find(doc => doc.type === 'Interests')?.name.split(', ');
    const linkedin = approvedDocuments.find(doc => doc.type === 'LinkedIn')?.name;
    const github = approvedDocuments.find(doc => doc.type === 'GitHub')?.name;
    const publications = approvedDocuments.filter(doc => doc.type === 'Publication');
    const achievements = approvedDocuments.filter(doc => doc.type === 'Achievement');
    const projects = approvedDocuments.filter(doc => doc.type === 'Project');
    const voluntaryWorks = approvedDocuments.filter(doc => doc.type === 'Voluntary Work');

    return {
        education,
        skills,
        interests,
        linkedin,
        github,
        publications,
        achievements,
        projects,
        voluntaryWorks,
        documents
    };
};
