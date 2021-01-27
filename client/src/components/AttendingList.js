// import React from "react";
// import { ListItem, List } from "../components/List";
// import DeleteBtn from "../components/DeleteBtn";
// import { Link } from "react-router-dom";
// import { useStoreContext } from "../utils/GlobalState";
// import {   REMOVE_MEMBER } from "../utils/actions";

// const AttendingList = (props) => {
//   // eslint-disable-next-line no-unused-vars
//   const [state, dispatch] = useStoreContext();

//  console.log(props, "props")

//   const removeFromMembers = id => {
//     dispatch({
//       type: REMOVE_MEMBER,
//       _id: id
//     });
//   };


//   return (
//     <div className="container mb-5 mt-5">
//       {props.members.length ? (
       
//         <List>
//           {props.members.map(member => (
//             <ListItem key={member._id}>
//               <Link to={"/registration/" + member._id}>
//                 <strong>
//                 {member.firstName} {member.lastName}
//                 </strong>
//               </Link>
//               <DeleteBtn onClick={() => removeFromMembers(member._id)} />
//             </ListItem>
//           ))}
//         </List>
//       ) : (
//         <h3>Come on and register your lazy bums!</h3> 
//       )}
//     </div>
//   );
// };


// export default AttendingList;

import React from "react";
import { ListItem, List } from "../components/List";
import { REMOVE_ATTENDEE } from "../utils/actions";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";



const AttendingList = () => {
  const [state, dispatch] = useStoreContext();
  const removeAttendee = (id) => {
    API.removeAttendee(id)
    .then(res => dispatch({
      type: REMOVE_ATTENDEE,
      attendeeId: id
    }))
    .catch(err => console.log(err));
  };

  

  return (
    <div className="container mb-5 mt-5">
   
     

      {state.currentPost.addsAttendee.length ? (
        <List>
          
          {state.members.filter(member => state.currentPost.addsAttendee.includes(member._id)).map(member => (
            <ListItem key={member._id}>
              <Link to={"/registration/" + member._id}>
                <strong>
                  {member.email}
                </strong>
              </Link>
              <DeleteBtn onClick={() => removeAttendee(member._id)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3>Come on and sign up you lazy bums!!</h3> 
      )}
              
    </div>
  );
};

export default AttendingList;
