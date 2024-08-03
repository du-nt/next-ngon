"use client";

import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

import Spinner from "@/components/atoms/Spinner";
import { login } from "@/actions/auth";
import useBoundStore from "@/store";
import { useQueryWithCb } from "@/hooks/useCustomQuery";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const authenticate = useBoundStore((state) => state.authenticate);
  const { refetch } = useQueryWithCb({ queryKey: ["user/me"], enabled: false });

  const searchParams = useSearchParams();
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const from = searchParams.get("from");

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (formData: FormData) => {
    await login(formData);
    await refetch();
    authenticate();
  };

  return (
    <Container maxWidth="xs">
      <Spinner>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </Box>

        <Box component="form" action={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            {...register("email")}
            autoFocus
            error={!!errors.email}
            helperText={
              errors.email?.message
                ? errors.email.message.toString()
                : undefined
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password")}
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={
              errors.password?.message
                ? errors.password.message.toString()
                : undefined
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Grid container>
            <Grid item xs>
              <Link
                href="/forgot-password"
                component={NextLink}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={{
                  pathname: "/register",
                  query: from ? { from } : undefined,
                }}
                component={NextLink}
                variant="body2"
              >
                Don&apos;t have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Spinner>
    </Container>
  );
}
