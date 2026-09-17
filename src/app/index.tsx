import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useActivityDetection from "../hooks/useActivityDetection";

import { calculateCalories } from "../utils/calories";
import { calculateDistance } from "../utils/distance";

export default function HomeScreen() {

  const {
    activity,
    intensity,
    steps,
  } = useActivityDetection();

  const distance = calculateDistance(steps);
  const calories = calculateCalories(steps);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Fitness Tracker
      </Text>

      <Text style={styles.subtitle}>
        Actividad en tiempo real
      </Text>

      {/* PASOS */}

      <View style={styles.mainCard}>

        <Text style={styles.cardTitle}>
          Pasos
        </Text>

        <Text style={styles.steps}>
          {steps.toLocaleString()}
        </Text>

        <Text style={styles.label}>
          pasos detectados
        </Text>

      </View>

      {/* ACTIVIDAD */}

      <View style={styles.activityCard}>

        <Text style={styles.cardTitle}>
          Actividad actual
        </Text>

        <Text style={styles.activity}>
          {activity}
        </Text>

        <Text style={styles.intensity}>
          Intensidad: {intensity.toFixed(2)}
        </Text>

      </View>

      {/* ESTADÍSTICAS */}

      <View style={styles.statsContainer}>

        <View style={styles.statCard}>

          <Text style={styles.statValue}>
            {distance}
          </Text>

          <Text style={styles.statLabel}>
            Distancia
          </Text>

        </View>

        <View style={styles.statCard}>

          <Text style={styles.statValue}>
            {calories}
          </Text>

          <Text style={styles.statLabel}>
            kcal
          </Text>

        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 25,
  },

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    color: "#777",
    marginBottom: 10,
  },

  steps: {
    fontSize: 64,
    fontWeight: "bold",
  },

  label: {
    color: "#888",
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  activity: {
    fontSize: 30,
    fontWeight: "bold",
  },

  intensity: {
    marginTop: 8,
    color: "#777",
  },

  statsContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  statValue: {
    fontSize: 28,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#777",
    marginTop: 5,
  },

});