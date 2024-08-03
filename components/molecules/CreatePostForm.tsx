"use client";

import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { getRandomImageUrl } from "@/utils";
import { createPost } from "@/actions/post";

export default function CreatePostForm() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const imageUrl = watch("image");

  const handleRandomPhotoClick = () => {
    const randomImageUrl = getRandomImageUrl();
    setValue("image", randomImageUrl);
  };

  return (
    <Box component="form" action={createPost} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Title"
        {...register("title")}
        autoFocus
        error={!!errors.title}
        helperText={
          errors.title?.message ? errors.title.message.toString() : undefined
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        {...register("content")}
        label="Content"
        error={!!errors.content}
        helperText={
          errors.content?.message
            ? errors.content.message.toString()
            : undefined
        }
      />

      <TextField
        margin="normal"
        required
        fullWidth
        {...register("price")}
        label="Price"
        error={!!errors.price}
        helperText={
          errors.price?.message ? errors.price.message.toString() : undefined
        }
      />

      <Button
        color="primary"
        variant="outlined"
        onClick={handleRandomPhotoClick}
        sx={{ mt: 2 }}
      >
        Random a photo
      </Button>

      <TextField {...register("image")} sx={{ display: "none" }} />

      <Box
        sx={{
          backgroundColor: "#eee",
          mt: 2,
          width: 300,
          height: 300,
          borderRadius: 2,
        }}
      >
        {imageUrl && (
          <Image
            style={{
              borderRadius: 8,
            }}
            width={300}
            height={300}
            src={imageUrl}
            alt="Oops ... not found. Please click random again!"
          />
        )}
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create
      </Button>
    </Box>
  );
}
