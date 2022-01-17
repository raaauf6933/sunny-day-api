import React from "react";
import Hero from "../components/Hero";
import { Box } from "@mui/material";

const MyBooking = () => {
  return (
    <>
      <Hero>
        <Box textAlign="center" margin="5em">
          <form action="#" class="bg-light p-5 contact-form">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Booking Reference"
              />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Email" />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary py-3 px-5">
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Hero>
    </>
  );
};

export default MyBooking;
