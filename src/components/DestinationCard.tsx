import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type DestinationCardProps = {
  city: string;
  country: string;
  flag: string;
  onPress: () => void;
};

const DestinationCard: React.FC<DestinationCardProps> = ({
  city,
  country,
  flag,
  onPress,
}) => (
  <TouchableOpacity style={styles.destinationCard} onPress={onPress}>
    <Text style={styles.destinationFlag}>{flag}</Text>
    <Text style={styles.destinationCity}>{city}</Text>
    <Text style={styles.destinationCountry}>{country}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  destinationCard: {
    width: 120,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  destinationFlag: {
    fontSize: 40,
    marginBottom: 10,
  },
  destinationCity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  destinationCountry: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default DestinationCard;
