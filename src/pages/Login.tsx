import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoginForm from "../components/form/LoginForm";
import LoginInput from "../components/form/LoginInput";

type TUser = {
  id: string;
  username: string;
  role: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      console.log('user info', userInfo);
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("user loging successfully", { id: toastId });
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <LoginForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <LoginInput type="text" name="userId" label="ID:" />
        <LoginInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </LoginForm>
    </Row>
  );
};

export default Login;
