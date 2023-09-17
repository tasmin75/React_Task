import React, { useEffect, useRef } from "react";
import style from "./CompanySetup.module.css";
import { Autocomplete, Grid, TextField } from "@mui/material";

const CompanySetup = () => {
  const industry = [];
  const country = [];
  const finYear = [];
  const businessType = [];
  const language = [];
  const dateFormat = [];
  const companyRef = useRef(null);
  const [userData , setUserData] = React.useState([]);

  const [inputData, setInputData] = React.useState({
    companyName: "",
    companyLogo: "",
    industry: "",
    businessType: "",
    businessLocation: "",
    state: "",
    street1: "",
    street2: "",
    city: "",
    pincode: "",
    phone: "",
    email: "",
    website: "",
    finanicalYear: "",
    language: "",
    date: "",
    pan: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };


  const handleUpload = (e) => {
    e.preventDefault();
    const file = companyRef.current.files[0];
    console.log(file);
  };
    const handleSaveData =(e)=>{
      e.preventDefault();
      
      setUserData([...userData,inputData]);
      console.log(userData);
      alert("Data Saved Successfully");
      
    }

    async function fetchIndustryData() {
      try {
        const Credentials = btoa("test:test123");

        const response = await fetch(
          "http://knowforth.online:3052/api/GetIndustryType",
          {
            headers: {
              Authorization: `Basic ${Credentials}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // setIndustry(data);
          data.map((element) => {
            industry.push(element.indtype);
          });
        } else {
          console.error("Failed to fetch industry data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchIndustryData();

    async function fetchCountryData() {
      try {
        const Credentials = btoa("test:test123");
        const res = await fetch(
          "http://knowforth.online:3052/api/GetCountries",
          {
            headers: {
              Authorization: `Basic ${Credentials}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          data.map((element) => {
            country.push(element.countryname);
          });
          console.log("log", countryname);
        } else {
          console.error("Failed to fetch country data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCountryData();

    async function fetchFinYearData() {
      try {
        const Credential = btoa("test:test123");
        const res = await fetch("http://knowforth.online:3052/api/GetFisYear", {
          headers: {
            Authorization: `Basic ${Credential}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          data.map((element) => {
            finYear.push(element.fiscalyear);
          });
          console.log("log", element.fiscalyear);
        } else {
          console.error("Failed to fetch country data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchFinYearData();

    async function fetchBusinessTypeData() {
      try {
        const Credentials = btoa("test:test123");
        const res = await fetch(
          "http://knowforth.online:3052/api/GetBusinessType",
          {
            headers: {
              Authorization: `Basic ${Credentials}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          data.map((element) => {
            businessType.push(element.bustype);
          });
          console.log("log", element.bustype);
        } else {
          console.error("Failed to fetch country data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchBusinessTypeData();

    async function fetchLanguageData() {
      try {
        const Credentials = btoa("test:test123");
        const res = await fetch("http://knowforth.online:3052/api/GetLang", {
          headers: {
            Authorization: `Basic ${Credentials}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          data.map((element) => {
            language.push(element.language);
          });
          console.log("log", language);
        } else {
          console.error("Failed to fetch country data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchLanguageData();

    async function fetchDateFormatData() {
      try {
        const Credentials = btoa("test:test123");
        const res = await fetch(
          "http://knowforth.online:3052/api/GetDateFormat",
          {
            headers: {
              Authorization: `Basic ${Credentials}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          data.map((element) => {
            dateFormat.push(element.dateformat);
          });
          console.log("log", dateFormat);
        } else {
          console.error("Failed to fetch country data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDateFormatData();


  return (
    <div className={style.companySetup}>
      <div className={style.container}>
        <h1 className={style.heading}>Company Setup</h1>
        <form action="" onSubmit={handleSaveData}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={style.input}
                id="companyName"
                label="Company Name"
                variant="outlined"
                name="companyName"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={style.flex_div}>
                <TextField
                  className={style.input}
                  variant="outlined"
                  value={companyRef.current?.files[0]?.name || ""}
                  onClick={() => companyRef.current.click()}
                  name="companyLogo"
                  onChange={handleInputChange}
                />
                <button
                  className={style.upload_btn}
                  onClick={() => companyRef.current.click()}
                >
                  Upload
                </button>
              </div>
              {/* <input
                type="file"
                ref={companyRef}
                style={{ display: "none" }}
                onChange={handleInputChange}
              /> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                name="industry"
                onChange={handleInputChange}
                options={industry}
                renderInput={(params) => (
                  <TextField {...params} label="Industry" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                className={style.input}
                id="businessType"
                options={businessType}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Business Type"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                className={style.input}
                id="businessLocation"
                label="Business Location/Country"
                options={country}
                name="businessLocation"
                onChange={handleInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Business Location/Country"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                className={style.input}
                id="state"
                label="State"
                name="state"
                onChange={handleInputChange}
                options={country}
                renderInput={(params) => (
                  <TextField {...params} label="State" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={style.input}
                id="street1"
                label="Street-1"
                name="street1"
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={style.input}
                id="street2"
                label="Street-2"
                name="street2"
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={style.input}
                id="city"
                label="City/Town/Village"
                variant="outlined"
                name="city"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={style.input}
                id="pincode"
                label="Pin Code"
                variant="outlined"
                name="pincode"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className={style.input}
                id="Phone"
                label="Phone Number"
                variant="outlined"
                name="phone"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className={style.input}
                id="email"
                label="E-mail"
                variant="outlined"
                name="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className={style.input}
                id="website"
                label="Website"
                variant="outlined"
                name="website"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                className={style.input}
                id="finanicalYear"
                name="finanicalYear"
                onChange={handleInputChange}
                options={finYear}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Financial Year"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                className={style.input}
                id="Language"
                label="Language"
                options={language}
                name="language"
                onChange={handleInputChange}
                renderInput={(params) => (
                  <TextField {...params} label="Language" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                className={style.input}
                id="Date"
                name="date"
                onChange={handleInputChange}
                options={dateFormat}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Date Format"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={style.input}
                id="pan"
                label="PAN No."
                variant="outlined"
                name="pan"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <button className={style.save_btn} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
