import {
    Navbar,
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert
} from "react-bootstrap";
import { fetchWeather, fetchGeolocation, capitalize } from "./functions";
import { GeolocationFields, WeatherFields } from "./types";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import {
    solDia,
    solNoite,
    chuvaDia,
    chuvaNoite,
    neveDia,
    neveNoite,
    nubladoDia,
    nubladoNoite
} from "./assets/assets";

export default function App() {
    const [weather, setWeather] = useState<WeatherFields>();
    const [geolocation, setGeolocation] = useState<GeolocationFields>();
    const [cidade, setCidade] = useState<string>("Canoas");
    const [pais, setPais] = useState<string>("Brasil");
    const [error, setError] = useState<string | undefined>("");
    const [cityNameClass, setCityNameClass] = useState<string | undefined>();
    const [tempClass, setTempClass] = useState<string | undefined>();
    const [weatherClass, setWeatherClass] = useState<string | undefined>();
    const [headerBsTheme, setHeaderBsTheme] = useState<"light" | "dark">(
        "dark"
    );
    const [display, setDisplay] = useState<string>("d-none");

    async function getWeather(event?: FormEvent<HTMLFormElement>) {
        if (event) event.preventDefault();
        setDisplay("d-none");

        const reqGeolocation = await fetchGeolocation({
            appid: import.meta.env.VITE_API_KEY,
            q: `${cidade},${pais}`,
            limit: 1
        });

        if (reqGeolocation.data.length) {
            const geolocation: GeolocationFields = reqGeolocation.data;

            const response = await fetchWeather({
                lat: geolocation[0].lat,
                lon: geolocation[0].lon,
                units: "metric",
                lang: "pt_br",
                appid: import.meta.env.VITE_API_KEY
            });

            if (response.status === 200) {
                setWeather(response.data);
                setGeolocation(geolocation);
                setError(undefined);
                setDisplay("d-flex");

                switch (response.data.weather[0].main) {
                    case "Thunderstorm": // Tempestade com raios
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${chuvaDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${chuvaNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-light");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        }
                        break;
                    case "Drizzle": // Chuvisco
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${chuvaDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${chuvaNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-light");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        }
                        break;
                    case "Rain": // Chuva
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${chuvaDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${chuvaNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-light");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        }
                        break;
                    case "Snow": // Neve
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${neveDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-dark");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${neveNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        }
                        break;
                    case "Atmosphere": // Condições do ar
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${nubladoDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${nubladoNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-light");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        }
                        break;
                    case "Clear": // Sol
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${solDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("light");
                            setCityNameClass("text-dark");
                            setTempClass("text-dark");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${solNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-dark");
                            setWeatherClass("text-dark");
                        }
                        break;
                    case "Clouds": // Nublado
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${nubladoDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("light");
                            setCityNameClass("text-dark");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${nubladoNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-light");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        }
                        break;
                    case "Mist":
                        if (response.data.weather[0].icon.endsWith("d")) {
                            document.body.style.backgroundImage = `url(${nubladoDia})`;

                            document.body.setAttribute(
                                "data-bs-theme",
                                "light"
                            );
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-dark");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        } else {
                            document.body.style.backgroundImage = `url(${nubladoNoite})`;

                            document.body.setAttribute("data-bs-theme", "dark");
                            setHeaderBsTheme("dark");
                            setCityNameClass("text-light");
                            setTempClass("text-light");
                            setWeatherClass("text-light");
                        }
                        break;
                }
            } else {
                setError(
                    "Erro ao obter os dados metereológicos. Tente novamente mais tarde."
                );
            }
        } else {
            setError(
                "Erro ao obter a cidade/país. Verifique se digitou corretamente."
            );
        }
    }

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <>
            <Navbar data-bs-theme={headerBsTheme}>
                <Container>
                    <Navbar.Brand href="/">WeatherApp</Navbar.Brand>
                </Container>
            </Navbar>

            <Container
                className="
                    mt-4
                    d-flex
                    justify-content-center
                    align-items-center
                    flex-column
                "
            >
                <h1 className="mb-5 text-center">Weather App</h1>

                <Form
                    className="w-100 mb-5 d-flex justify-content-center"
                    onSubmit={(event: FormEvent<HTMLFormElement>) =>
                        getWeather(event)
                    }
                >
                    <Row className="m-0">
                        <Col className="p-0 me-2">
                            <Form.Label htmlFor="cidade" className="ms-1 mb-1">
                                Cidade
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cidade"
                                value={cidade}
                                id="cidade"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => setCidade(event.target.value)}
                            />
                        </Col>

                        <Col className="p-0 me-2">
                            <Form.Label htmlFor="pais" className="ms-1 mb-1">
                                País
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="País"
                                value={pais}
                                id="pais"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => setPais(event.target.value)}
                            />
                        </Col>

                        <Col className="p-0" xs={1}>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ marginTop: "28px" }}
                            >
                                Enviar
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <p className={display === "d-none" ? "d-block" : "d-none"}>
                    Obtendo clima...
                </p>

                {!error ? (
                    weather &&
                    geolocation && (
                        <div
                            className={`weather w-100 ${display} justify-content-center align-items-center flex-column`}
                        >
                            <h3 className={`mb-4 mt-4 ${cityNameClass}`}>
                                {geolocation[0].name}, {geolocation[0].state} -
                                {geolocation[0].country}
                            </h3>
                            <Row style={{ width: "250px" }}>
                                <Col
                                    className="d-flex justify-content-center align-items-center"
                                    xs={5}
                                >
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                        title={capitalize(
                                            weather.weather[0].description
                                        )}
                                    />
                                </Col>
                                <Col
                                    className="pt-3 d-flex flex-column justify-content-center align-items-center"
                                    xs={6}
                                >
                                    <h2
                                        className={`fw-bold text-center ${tempClass}`}
                                    >{`${Math.round(
                                        weather.main.temp
                                    )} °C`}</h2>
                                    <p
                                        className={`text-center ${weatherClass}`}
                                    >
                                        {capitalize(
                                            weather.weather[0].description
                                        )}
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    )
                ) : (
                    <Alert variant="danger">{error}</Alert>
                )}
            </Container>
        </>
    );
}
