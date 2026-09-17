import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export default function useActivityDetection() {
  const [activity, setActivity] = useState("Reposo");
  const [intensity, setIntensity] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    let subscription = null;

    const startAccelerometer = async () => {
      try {
        const available = await Accelerometer.isAvailableAsync();

        console.log(
          "Acelerómetro disponible:",
          available
        );

        if (!available) {
          return;
        }

        // Actualizar datos cada 100 ms
        Accelerometer.setUpdateInterval(100);

        let lastMovement = 0;
        let lastStepTime = 0;

        subscription = Accelerometer.addListener(
          ({ x, y, z }) => {

            // Magnitud total del movimiento
            const magnitude = Math.sqrt(
              x * x +
              y * y +
              z * z
            );

            // Eliminamos aproximadamente la gravedad
            const movement = Math.abs(
              magnitude - 1
            );

            setIntensity(movement);

            // -------------------------
            // DETECTAR ACTIVIDAD
            // -------------------------

            if (movement < 0.08) {
              setActivity("Reposo");
            } else if (movement < 0.25) {
              setActivity("Caminando");
            } else {
              setActivity("Corriendo");
            }

            // -------------------------
            // DETECTAR PASO
            // -------------------------

            const now = Date.now();

            const stepDetected =
              movement > 0.18 &&
              movement > lastMovement &&
              now - lastStepTime > 300;

            if (stepDetected) {

              setSteps(
                (currentSteps) =>
                  currentSteps + 1
              );

              lastStepTime = now;
            }

            lastMovement = movement;
          }
        );

      } catch (error) {
        console.error(
          "Error con el acelerómetro:",
          error
        );
      }
    };

    startAccelerometer();

    // Limpiar listener
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return {
    activity,
    intensity,
    steps,
  };
}