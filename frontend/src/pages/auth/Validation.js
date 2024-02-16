// import Box from "@mui/material/Box";
// import { useUsers } from "@/hooks/models/useUsers";
// import CustomButton from "@/components/commons/CustomButton";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// export default function Validation() {
//   const {

//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,

//   } = useForm();
//   function getParams(url) {
//     const params = {};
//     const urlSearchParams = new URLSearchParams(url.split("?")[1]);
//     for (const [key, value] of urlSearchParams) {
//       params[key] = value;
//     }
//     return params;
//   }

//   const params = getParams(window.location.search);
//   const { emailValidationMutation } = useUsers(null, params["token"]);
//   const onSubmit = async (data) => {
//     try {
//       await emailValidationMutation.mutateAsync({});
//       toast.success("You're account is verify!");
//       reset();
//     } catch (error) {
//       console.log(error);
//       toast.error("Error for verify account");
//     }
//   };

//   return (

//       <Box
//         component="form"
//         noValidate
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ mt: 3 }}
//       >
//         <CustomButton
//           isSubmitting={isSubmitting}
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           Verify my account
//         </CustomButton>
//       </Box>

    

//   );
// }

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useUsers } from "@/hooks/models/useUsers";
import { toast } from "sonner";

export default function Validation() {
  function getParams(url) {
    const params = {};
    const urlSearchParams = new URLSearchParams(url.split("?")[1]);
    for (const [key, value] of urlSearchParams) {
      params[key] = value;
    }
    return params;
  }

  const params = getParams(window.location.search);
  const { emailValidationMutation } = useUsers(null, params["token"]);

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        await emailValidationMutation.mutateAsync({});
        toast.success("Your account is verified!");
        window.location.href = "/login"; // Rediriger vers la page de connexion après la vérification réussie
      } catch (error) {
        console.log(error);
        toast.error("Error verifying account");
      }
    };

    verifyAccount();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <Box sx={{ mt: 3 }}>
      {/* Vous pouvez ajouter ici une indication visuelle que la vérification est en cours */}
      <p>Verifying your account...</p>
    </Box>
  );
}

