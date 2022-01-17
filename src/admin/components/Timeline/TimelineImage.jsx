// import React from 'react';
// import {Avatar,Typography,Card,CardContent,Tooltip} from "@mui/material"
// import PersonIcon from "@mui/icons-material/Person";
// import ImagePreviewDialog from "../ImagePreviewDialog/ImagePreviewDialog"

// const TimelineImage = (props) => {
//     const { date, user, message, imageSrc } = props;
//     return (

//         <div className={classes.root}>
//       {user && (
//         <Avatar
//           className={classes.avatar}
//           style={{ background: palette[CRC.str(user.email) % palette.length] }}
//         >
//           <PersonIcon />
//         </Avatar>
//       )}
//       <div className={classes.title}>
//         <Typography>{user?.email}</Typography>
//         <Typography>
//           Date here
//         </Typography>
//       </div>
//       <Card className={classes.card}>
//         <CardContent className={classes.cardContent}>
//           <Typography
//             dangerouslySetInnerHTML={{
//               __html: message.replace(/\n/g, "<br />")
//             }}
//           />
//           <Tooltip title="Show Image">
//             <ImageOutlinedIcon
//               className={classes.imageIcon}
//               color="primary"
//               fontSize="large"
//               onClick={() => setIsOpenModal(true)}
//             />
//           </Tooltip>
//         </CardContent>
//       </Card>
//       <ImagePreviewDialog
//         imageSrc={imageSrc}
//         isOpenModal={isOpenModal}
//         setIsOpenModal={setIsOpenModal}
//         caption={message}
//       />
//     </div>

//      );
// }

// export default TimelineImage;
