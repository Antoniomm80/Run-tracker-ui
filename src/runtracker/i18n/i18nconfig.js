import {setLocale, setTranslations} from "react-i18nify";

setTranslations({
    es: {
        application: {
            title: "Rutas",
        },
        actions: {
            add: "Añadir",
            save: "Guardar"
        },
        validation: {
            mandatory: "El campo es obligatorio",
            timeFormat: "El formato del tiempo no es correcto",
            distanceFormat: "La distancia debe ser mayor a cero"
        },
        bestTimePanel: {
            title: "Mejor tiempo"
        },
        newPath: {
            name: "Nombre de la ruta",
            distance: "Distancia (en metros)",
            pathToMap: "URL del mapa",
            description: "Descripción",
            saveSuccess: "La ruta se ha guardado correctamente",
            saveError: "Se ha producido un error al guardar la ruta"
        },
        newTime: {
            trainingDate: "Fecha del entrenamiento",
            durationString: "Tiempo",
            saveSuccess: "El registro de tiempo se ha guardado correctamente",
            saveError: "Se ha producido un error al guardar el registro de tiempo"
        },
        labels: {
            kms: "Kms",
            best: "Mejor",
            duration: "Duración",
            pace: "Ritmo(min/km)",
            times: "Tiempos",
            graph: "Gráfica",
            noTimeSet: "Sin tiempos registrados",
            newTime: "Nuevo registro de tiempo",
            newPath: "Nuevo recorrido"
        },
        stats: {
            title: "Estadísticas",
            graphTitle: "Recorridos por mes",
            time: "Tiempo total (en horas)",
            distance: "Distancia total (en kms)",
        }
    },
});

setLocale("es");