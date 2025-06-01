import React from 'react';

const UserCard = ({ shouldShowButton = true, user }) => {
  const {
    firstName,
    lastName,
    about,
    age,
    photoUrl = 'https://connectkaro.org/wp-content/uploads/2019/03/placeholder-profile-male-500x500.png',
    skills,
    gender,
  } = user;
  console.log('shouldShowButton', shouldShowButton);
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
        {shouldShowButton && (
          <div className="flex justify-center card-actions mt-2">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
