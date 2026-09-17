import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";

export default function usePedometer() {
  const [steps, setSteps] = useState(0);
  const [available, setAvailable] = useState(false);
  const [permission, setPermission] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(true);

  const checkPermission = async () => {
    try {
      const result = await Pedometer.getPermissionsAsync();

      console.log("Permiso actual:", result);

      setPermission(result.granted);
      setCanAskAgain(result.canAskAgain);

      return result;
    } catch (error) {
      console.error("Error comprobando permiso:", error);
      return null;
    }
  };

  useEffect(() => {
    let subscription;

    const initialize = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();

        console.log("Podómetro disponible:", isAvailable);

        setAvailable(isAvailable);

        if (!isAvailable) {
          return;
        }

        let permissionResult = await checkPermission();

        // Si todavía podemos solicitar permiso
        if (
          permissionResult &&
          !permissionResult.granted &&
          permissionResult.canAskAgain
        ) {
          permissionResult =
            await Pedometer.requestPermissionsAsync();

          console.log(
            "Resultado solicitud permiso:",
            permissionResult
          );

          setPermission(permissionResult.granted);
          setCanAskAgain(permissionResult.canAskAgain);
        }

        // Si no tenemos permiso, detener aquí
        if (!permissionResult?.granted) {
          console.log("Permiso del podómetro DENEGADO");
          return;
        }

        console.log("Permiso del podómetro CONCEDIDO");

        setPermission(true);

        // Comenzar a escuchar pasos
        subscription = Pedometer.watchStepCount(
          (result) => {
            console.log("Pasos:", result.steps);

            setSteps(result.steps);
          }
        );

      } catch (error) {
        console.error(
          "Error inicializando podómetro:",
          error
        );
      }
    };

    initialize();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return {
    steps,
    available,
    permission,
    canAskAgain,
    checkPermission,
  };
}