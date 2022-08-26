import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const [schedule, setSchedule] = useState("Monthly");
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [propertyPrice, setPropertyPrice] = useState("0");
  const [downPayment, setDownPayment] = useState("0");
  const [annualInterestRate, setAnnualInterestRate] = useState("0");
  const [payment, setPayment] = useState(0.0);

  const handleChange = (value, setter) => {
    setPayment(0.0);
    setter(value);
  };

  const validateInputs = () => {
    if (
      propertyPrice &&
      propertyPrice > 0 &&
      downPayment &&
      downPayment > 0 &&
      annualInterestRate &&
      annualInterestRate > 0
    )
      return true;

    return false;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/paymentSchedule",
          {
            propertyPrice: parseFloat(propertyPrice),
            downPayment: parseFloat(downPayment),
            annualInterestRate: parseFloat(annualInterestRate),
            amortizationPeriod: parseInt(amortizationPeriod),
            schedule,
          }
        );
        setPayment(response.data.paymentPerSchedule);
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="App">
      <Grid container sx={{ alignItems: "center", height: "100vh" }}>
        <Grid container item sm={12} sx={{ justifyContent: "center" }}>
          <Typography variant="h1">
            British columbia mortgage calculator
          </Typography>
        </Grid>
        <Grid container item sm={12} sx={{ justifyContent: "center" }}>
          {payment > 0.0 && (
            <Typography variant="h3">
              Your {schedule} payment is of ${payment}
            </Typography>
          )}
        </Grid>
        <Grid
          container
          item
          sm={12}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid container item sm={1}>
            Property Price:
          </Grid>
          <Grid container item sm={5}>
            <TextField
              value={propertyPrice}
              onChange={(e) => handleChange(e.target.value, setPropertyPrice)}
              id="property-price"
              label="Property Price"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid container item sm={1}>
            Initial Payment:
          </Grid>
          <Grid container item sm={5}>
            <TextField
              value={downPayment}
              onChange={(e) => handleChange(e.target.value, setDownPayment)}
              id="first-payment"
              label="First Payment"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid container item sm={1}>
            Annual Interest Rate:
          </Grid>
          <Grid container item sm={5}>
            <TextField
              value={annualInterestRate}
              onChange={(e) =>
                handleChange(e.target.value, setAnnualInterestRate)
              }
              id="annual-interest"
              label="Annual Interest Rate"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid container item sm={1}>
            Amortization Period:
          </Grid>
          <Grid container item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="amortization-period-label">
                Amortization Period
              </InputLabel>
              <Select
                labelId="amortization-period-label"
                id="amortization-period-select"
                value={amortizationPeriod}
                label="Age"
                onChange={(e) =>
                  handleChange(e.target.value, setAmortizationPeriod)
                }
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid container item sm={1}>
            Schedule:
          </Grid>
          <Grid container item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="schedule-label">Schedule</InputLabel>
              <Select
                labelId="schedule-label"
                id="schedule-select"
                value={schedule}
                label="Age"
                onChange={(e) => handleChange(e.target.value, setSchedule)}
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Biweekly">Biweekly</MenuItem>
                <MenuItem value="AcceleratedBiweekly">
                  Accelerated Biweekly
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button onClick={handleSubmit}> Calculate</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
