--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-0+deb12u1)
-- Dumped by pg_dump version 15.6 (Debian 15.6-0+deb12u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cars; Type: TABLE; Schema: public; Owner: RPI_Marcin
--

CREATE TABLE public.cars (
    car_name text,
    param_1 text,
    param_2 text,
    param_3 text
);


ALTER TABLE public.cars OWNER TO "RPI_Marcin";

--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: RPI_Marcin
--

COPY public.cars (car_name, param_1, param_2, param_3) FROM stdin;
Ford Fusion	red	4	default
Ford Mustang	red	4	classic
Ferrari LaFerrari	red	2	supercar
Bugatti Chiron	black	2	supercar
Lamborghini Huracan	green	2	supercar
Opel Vectra	grey	5	default
Dodge Viper	yellow	2	sport
Dodge Charger	black	4	classic
Tesla Model Y	white	4	electric
Honda Accord	red	4	default
Porsche 911	orange	2	classic
Chevrolet Camaro	red	4	classic
Ford Model T	black	2	classic
Rolls Royce Phantom	black	4	premium
Rolls Royce Ghost	white	4	premium
Rolls Royce Wraith	black	4	premium
\.


--
-- Name: TABLE cars; Type: ACL; Schema: public; Owner: RPI_Marcin
--

GRANT SELECT ON TABLE public.cars TO python;


--
-- PostgreSQL database dump complete
--

