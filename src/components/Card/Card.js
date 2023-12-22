
import React from 'react';
import '../CssFiles/Card.css';

const PriorityIcons = {
  0: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">{/* ... SVG path for priority 0 */}</svg>,
  1: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">{/* ... SVG path for priority 1 */}</svg>,
  2: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">{/* ... SVG path for priority 2 */}</svg>,
  3: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">{/* ... SVG path for priority 3 */}</svg>,
  4: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">{/* ... SVG path for priority 4 */}</svg>,
};

const getIcon = (priority) => PriorityIcons[priority];

const CardTag = ({ tag }) => (
  <div className="card-tag-box">
    <div className="card-tag-title">{tag}</div>
  </div>
);

const Card = (props) => {
  const { cardDetails } = props;

  return (
    <div className="card-container">
      <div className="card-id-wrapper">
        <div className="card-id">{cardDetails.id}</div>
        <div className="card-profile">
          <div className="card-profile-initial">
            {`${cardDetails.userObj.name[0]}${cardDetails.userObj.name[1]}`}
          </div>
          <div className={`card-profile-initial-available ${cardDetails.userObj.available ? 'card-profile-initial-available-true' : ''}`}></div>
        </div>
      </div>

      <div className="card-title">{cardDetails.title}</div>

      <div className="card-tag">
        {getIcon(cardDetails.priority)}

        {cardDetails.tag.map((tag) => (
          <CardTag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default Card;
