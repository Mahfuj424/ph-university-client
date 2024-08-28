import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });

  const [login] = useLoginMutation();

  const handleLogin = async (data: FieldValues) => {
    const toastId = toast.loading("logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("user loging successfully", { id: toastId });
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <label htmlFor="id">ID:</label>
      <input type="text" id="id" {...register("id")} />
      <label htmlFor="password">Password</label>
      <input type="text" id="password" {...register("password")} />
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
