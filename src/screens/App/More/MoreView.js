import React from "react";
import { Button, Text, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";
import i18n from "../../../languages";
import AddAPhoto from "../../../../assets/images/svg/add_a_photo.svg";

export default ({ logout, setLanguage }) => {
  return (
    <View style={style.container}>
      <Text>{i18n.t("more")}</Text>
      <Button title="Logout" onPress={logout} />
      <Text>Change language</Text>
      <Button title="English" onPress={() => setLanguage("en")} />
      <Button title="German" onPress={() => setLanguage("de")} />
      <Button title="Italian" onPress={() => setLanguage("it")} />
      <AddAPhoto height={60} width={60} />
    </View>
  );
};
