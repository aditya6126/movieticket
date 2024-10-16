import React from 'react';

const teamMembers = [
  { name: 'Steve Ambuul', title: 'Chief Revenue Officer', imgSrc: '"C:\Users\adity\Pictures\Screenshots\Screenshot 2024-08-23 185252.png"', department: 'Leadership' },
  { name: 'Alden Dale', title: 'Director of Solutions', imgSrc: 'path/to/image2.jpg', department: 'Leadership' },
  { name: 'Kaley Deneen', title: 'Director of Strategy & Service, EMEA', imgSrc: 'path/to/image3.jpg', department: 'Leadership' },
  { name: 'Phil Dupertuis', title: 'Director of Client Services, NA', imgSrc: 'path/to/image4.jpg', department: 'Leadership' },
  { name: 'Tony Eades', title: 'Chief Evangelist', imgSrc: 'path/to/image5.jpg', department: 'Leadership' },
];

const TeamPage = () => {
  return (
    <div className="text-center py-10 bg-black-100">
      <h2 className="text-3xl font-bold mb-6">Meet the <span className="text-indigo-600">team</span>.</h2>
     
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member, index) => (
          <div className="w-60 m-4 text-center" key={index}>
            <img
              src={member.imgSrc}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 shadow-lg"
            />
            <h3 className="text-lg font-medium">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
