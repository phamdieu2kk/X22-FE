import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Instruction from "../pages/Instruction";
import Topic from "../pages/Topic";
import Contact from "../pages/Contact";
import Questions from "../pages/Questions";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Challenges from "../Components/Challenges";
import Forgotpassword from "../Components/Forgotpassword";
import Account from "../pages/Account";
import UpdateAccountForm from "../pages/UpdateAccountForm";
import ResetPassword from "../Components/ResetPassword";
import TopicDetail from "../Components/TopicDetail";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instruction" element={<Instruction />} />
      <Route path="/topic" element={<Topic />} />
      <Route path="/topic/:topicId/detail" element={<TopicDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/account" element={<Account />} />
      <Route path="/updateaccountform" element={<UpdateAccountForm />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/topic/:topicId/challenges" element={<Challenges />} />
    </Routes>
  );
}
