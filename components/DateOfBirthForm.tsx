import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { white } from "../assets/colours";
import { validateDate } from "../utils";
import FormInput from "./FormInput";

interface Props {
  day: string;
  month: string;
  year: string;
  setDay: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<string>>;
  setYear: Dispatch<SetStateAction<string>>;
  avoidKeyboard: Dispatch<SetStateAction<boolean>>;
  message: string;
}

const DateOfBirthForm = ({
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear,
  avoidKeyboard,
  message,
}: Props) => {
  const isValid = () => {
    if (!day || !month || !year) return true;
    else return validateDate(+day, +month, +year);
  };

  return (
    <View>
      <Text style={styles.text}>Date of Birth</Text>
      <View style={styles.DOBcontainer}>
        <FormInput
          value={day}
          onChange={setDay}
          placeholder="  DD  "
          label=""
          isNumber
          horizontal
          avoidKeyboard={avoidKeyboard}
          isAvoiding
        />
        <FormInput
          value={month}
          onChange={setMonth}
          placeholder="  MM  "
          label=""
          isNumber
          horizontal
          avoidKeyboard={avoidKeyboard}
          isAvoiding
        />
        <FormInput
          value={year}
          onChange={setYear}
          placeholder="YYYY"
          label=""
          isNumber
          horizontal
          last
          avoidKeyboard={avoidKeyboard}
          isAvoiding
        />
      </View>
      {!isValid() ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  innerContainer: {
    paddingBottom: 24,
  },
  DOBcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 24,
    marginLeft: 16,
    marginBottom: -15,
    color: white,
  },
  hidden: {
    display: "none",
  },
  message: {
    marginTop: 8,
    marginLeft: 16,
    color: white,
  },
});

export default DateOfBirthForm;
