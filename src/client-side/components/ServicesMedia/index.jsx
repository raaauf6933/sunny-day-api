import React from "react";

const ServicesMedia = (props) => {
  const { image, title, content, color } = props;
  return (
    <>
      <div
        className={`services services-1 ${color} d-block img`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="icon d-flex align-items-center justify-content-center">
          <span className="flaticon-paragliding"></span>
        </div>
        <div className="media-body">
          <h3 className="heading mb-3">{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default ServicesMedia;
