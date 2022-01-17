import React from "react";

const SectionLabel = (props) => {
  const { title } = props;
  return (
    <div class="row justify-content-center pb-4 mt-5">
      <div class="col-md-12 heading-section text-center ftco-animate fadeInUp ftco-animated">
        <span class="subheading">{title}</span>
        <h2 class="mb-4">Popular</h2>
      </div>
    </div>
  );
};

export default SectionLabel;
