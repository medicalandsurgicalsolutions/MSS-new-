const submitHandler = async ({ phone, password }) => {
    setLoading(true);

    // STEP 1: Request OTP
    if (!isOpen) {
      try {
        const res = await CustomerServices.loginCustomer({ phone });
        notifySuccess(res?.message || "OTP Sent Successfully!");
        setIsOpen(true);
        setIsBtnName("Login");
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }

    // STEP 2: Verify OTP
    } else {
      try {
        const res = await CustomerServices.loginCustomer({ phone, password });

        if (res?.token) {
          notifySuccess("Login successful!");

          // Save token
          localStorage.setItem("mss_token", res.token);
          setToken(res.token);

          // SAFE REDIRECTION LOGIC
          let url = "/"; // default to homepage
          if (redirectUrl) {
            try {
              // Try parsing as full URL
              const parsedUrl = new URL(redirectUrl);
              url = parsedUrl.pathname; // use only the path part
            } catch {
              // If parsing fails, assume it's already a relative path
              url = redirectUrl.startsWith("/") ? redirectUrl : "/";
            }
          }
          router.push(url);

        } else {
          notifyError(res?.message || "Invalid OTP!");
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
  };
