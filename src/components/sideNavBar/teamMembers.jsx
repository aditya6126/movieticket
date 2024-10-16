import React from 'react';
import img1 from "C:/Users/adity/Pictures/Screenshots/IMG_2664[1].jpg";
import img2 from "C:/Users/adity/Pictures/Screenshots/20230601_215302-01[2].jpeg";
import img3 from "C:/Users/adity/Pictures/Screenshots/WhatsApp Image 2024-08-23 at 22.30.35_91ca4d95.jpg";
import img4 from "C:/Users/adity/Pictures/Screenshots/WhatsApp Image 2024-08-23 at 22.43.18_3a24a399.jpg";
import img5 from "C:/Users/adity/Pictures/Screenshots/WhatsApp Image 2024-08-23 at 22.52.03_29359587.jpg";

const teamMembers = [
  { name: 'Mohammad Ali', title: 'React & Mongo-DB', imgSrc: img1 },
  { name: 'Umale Aditya', title: 'React & Mongo-DB', imgSrc: img4 },
  { name: 'Shaikh Sufiyan', title: 'Documentation', imgSrc: img2 },
  { name: 'Shaikh Faizan', title: 'React', imgSrc: img3 },
  { name: 'Shubham Gupta', title: 'PPT', imgSrc: img5 },
];

const TeamPage = () => {
  return (
    <div className="text-center py-10 bg-black-100">
      <h2 className="text-3xl font-bold mb-6">
        Meet the <span className="text-indigo-600">team</span>.
      </h2>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member, index) => (
          <div className="w-60 m-4 text-center" key={index}>
            <img
              src={member.imgSrc}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 shadow-lg object-cover"
            />
            <h3 className="text-lg font-medium">{member.name}</h3>
            <p className="text-sm text-black-600">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
