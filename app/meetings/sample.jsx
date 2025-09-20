// "use client";

// import { useEffect, useState } from "react";
// import {
//   StreamVideoClient,
//   StreamVideo,
//   StreamCall,
//   useCall,
//   useCallStateHooks,
//   CallingState,
// } from "@stream-io/video-react-sdk";
// import { supabase } from "@/services/supabaseClient";

// export default function VideoCallPage() {
//   const [client, setClient] = useState();
//   const [call, setCall] = useState();
//   const [userAccessToken, setUserAccessToken] = useState();

//   const fun = async () => {
//     // used a 2 way security so that frontend sends accessToken of interviewer which
//     // are then verified at backend to get the real user id and based on it my token for vc is generated
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     const token = session?.access_token;
//     setUserAccessToken(token);
//     console.log("AccessToken", token);
//   };

//   useEffect(() => {
//     const init = async () => {
//       const userId = "candidate-123"; // later: get from Supabase auth

//       const res = await fetch("/api/stream-token", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });
//       fun();
//       const { token, apiKey } = await res.json();

//       const client = new StreamVideoClient({
//         apiKey,
//         user: { id: userId, name: "Candidate 123" },
//         token,
//       });

//       console.log(client);

//       // Create or join a call
//       const call = client.call("default", "my-interview-room");
//       await call.join({ create: true });

//       setClient(client);
//       setCall(call);
//     };

//     init();
//   }, []);

//   if (!client || !call) return <div>Loading video call...</div>;

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// function MyUILayout() {
//   const call = useCall();
//   const { useCallCallingState, useParticipantCount } = useCallStateHooks();

//   const callingState = useCallCallingState();
//   const participantCount = useParticipantCount();

//   if (callingState !== CallingState.JOINED) {
//     return <div>🔌 Connecting...</div>;
//   }

//   return (
//     <div>
//       ✅ Call "{call?.id}" has {participantCount} participants
//     </div>
//   );
// }
