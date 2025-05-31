import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, about, age, photoUrl, skills, gender } = user;
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <p>{about}</p>

        {age && (
          <p>
            {age}, {gender && <span>{gender}</span>}
          </p>
        )}

        {skills && <p>{skills.join(',')}</p>}
        <div className="flex justify-center card-actions mt-2">
          <button className="btn btn-secondary">Accept</button>
          <button className="btn btn-primary">Deny</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
