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
        error={!!errors.email}
        helperText={
          errors.email?.message ? errors.email.message.toString() : undefined
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        {...register("content")}
        label="Content"
        error={!!errors.password}
        helperText={
          errors.password?.message
            ? errors.password.message.toString()
            : undefined
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

      <input {...register("image")} className="hidden" />

      <Box className="bg-[#eee] mt-6 w-[300px] h-[300px] rounded">
        {imageUrl && (
          <Image
            className="rounded"
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
