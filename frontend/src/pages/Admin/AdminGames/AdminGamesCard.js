import React from "react";

export default function AdminGameCard({ game }) {


  //Image part
  // const handleImageUpload = async (data, setFile) => {
  //   try {
  //     // console.log(ENDPOINTS.games.gameImg(game.id));
  //     const response = await httpPostMultiPart(
  //       ENDPOINTS.games.gameImg(game.id),
  //       data
  //     );
  //     updateGamesList((prev) =>
  //       prev.map((game) => {
  //         if (game.id === response.data.id) {
  //           return response.data;
  //         }
  //         return game;
  //       })
  //     );
  //     setFile(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
        {/* <CardMedia
          sx={{ height: 300, backgroundColor: "red" }}
          image={
            (game.fileUrl && process.env.REACT_APP_API_URL + game.fileUrl) ||
            "/reptile.jpg"
          }
          title={game.title}
        >
          <AdminGameImageUploader
            sx={{ backgroundColor: "white" }}
            onUpload={handleImageUpload}
          />
        </CardMedia> */}
        {/* <Divider component="div" role="presentation" /> */}


    </>
  );
}
