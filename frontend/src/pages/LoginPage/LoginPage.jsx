import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./LoginPage.css";

export default function LoginPage() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // State for Login
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // State for Register - user only
  const [registerData, setRegisterData] = useState({
    userType: "Client", 
    firstName: "",
    secondName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in...", loginData);
    navigate("/home");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Registering...", registerData);
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{t("auth.title")}</h2>

        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="auth-tabs">
          
          {/* === LOG IN TAB === */}
          <TabPanel header={t("auth.loginTab")}>
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="loginEmail" className="input-label">{t("auth.email")}</label>
                <InputText
                  id="loginEmail"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full p-inputtext-lg"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword" className="input-label">{t("auth.password")}</label>
                <Password
                  id="loginPassword"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  feedback={false}
                  toggleMask
                  className="w-full"
                  inputClassName="w-full p-inputtext-lg"
                  required
                />
              </div>

              <Button
                type="submit"
                label={t("auth.loginButton")}
                icon="pi pi-sign-in"
                className="auth-btn"
              />
            </form>

            <div className="register-link-container">
              <span className="secondary-text">{t("auth.noAccount")}</span>
              <Button
                label={t("auth.createAccount")}
                className="p-button-link custom-link-btn" 
                onClick={() => setActiveIndex(1)}
              />
            </div>
          </TabPanel>

          {/* === REGISTER TAB === */}
          <TabPanel header={t("auth.registerTab")}>
            
            <form onSubmit={handleRegisterSubmit} className="auth-form">
                {/* First Name & Middle Name Row */}
                <div className="flex-row">
                  <div className="form-group flex-1">
                    <label className="input-label">{t("auth.firstName")}</label>
                    <InputText
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className="w-full p-inputtext-lg"
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label className="input-label">{t("auth.middleName")}</label>
                    <InputText
                      value={registerData.secondName}
                      onChange={(e) => setRegisterData({ ...registerData, secondName: e.target.value })}
                      className="w-full p-inputtext-lg"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label className="input-label">{t("auth.lastName")}</label>
                  <InputText
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    className="w-full p-inputtext-lg"
                    required
                  />
                </div>

                {/* <Divider /> */}

                {/* Email */}
                <div className="form-group">
                  <label className="input-label">{t("auth.email")}</label>
                  <InputText
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full p-inputtext-lg"
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="input-label">{t("auth.password")}</label>
                  <Password
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    toggleMask
                    className="w-full"
                    inputClassName="w-full p-inputtext-lg"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  label={t("auth.registerButton")}
                  icon="pi pi-user-plus"
                  className="auth-btn"
                />
            </form>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}