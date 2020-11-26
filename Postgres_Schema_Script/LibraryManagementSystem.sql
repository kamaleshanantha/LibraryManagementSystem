--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2019-10-27 16:48:50 CDT

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

DROP DATABASE lms;
--
-- TOC entry 3234 (class 1262 OID 16621)
-- Name: lms; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE lms WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect lms

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

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16630)
-- Name: authors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.authors (
    author_id integer NOT NULL,
    name character varying(100)
);


--
-- TOC entry 202 (class 1259 OID 16622)
-- Name: book; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.book (
    isbn character varying(10) NOT NULL,
    title character varying(1000) NOT NULL,
    ischeckedout boolean
);


--
-- TOC entry 204 (class 1259 OID 16635)
-- Name: book_authors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.book_authors (
    isbn character varying(10) NOT NULL,
    author_id integer NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 16677)
-- Name: book_loans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.book_loans (
    isbn character varying(10),
    date_out date,
    due_date date,
    date_in date,
    loan_id integer NOT NULL,
    card_id integer
);


--
-- TOC entry 208 (class 1259 OID 16730)
-- Name: book_loans_loan_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.book_loans ALTER COLUMN loan_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.book_loans_loan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 1213231
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16650)
-- Name: borrower; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.borrower (
    ssn character varying(9) NOT NULL,
    bname character varying(100) NOT NULL,
    address character varying(1000) NOT NULL,
    phone character varying(10),
    card_id integer NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 24922)
-- Name: borrower_card_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.borrower ALTER COLUMN card_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.borrower_card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1
);


--
-- TOC entry 207 (class 1259 OID 16693)
-- Name: fines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fines (
    loan_id integer NOT NULL,
    fine_amt double precision,
    paid boolean
);


--
-- TOC entry 3086 (class 2606 OID 16634)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);


--
-- TOC entry 3088 (class 2606 OID 16639)
-- Name: book_authors book_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_pkey PRIMARY KEY (author_id, isbn);


--
-- TOC entry 3094 (class 2606 OID 16736)
-- Name: book_loans book_loans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_pkey PRIMARY KEY (loan_id);


--
-- TOC entry 3084 (class 2606 OID 16629)
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (isbn);


--
-- TOC entry 3090 (class 2606 OID 24932)
-- Name: borrower borrower_card_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.borrower
    ADD CONSTRAINT borrower_card_id_pk PRIMARY KEY (card_id);


--
-- TOC entry 3092 (class 2606 OID 24984)
-- Name: borrower borrower_ssn_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.borrower
    ADD CONSTRAINT borrower_ssn_unique UNIQUE (ssn);


--
-- TOC entry 3097 (class 2606 OID 16697)
-- Name: fines fines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fines
    ADD CONSTRAINT fines_pkey PRIMARY KEY (loan_id);


--
-- TOC entry 3095 (class 1259 OID 24938)
-- Name: fki_book_loans_cardid_fk; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_book_loans_cardid_fk ON public.book_loans USING btree (card_id);


--
-- TOC entry 3098 (class 2606 OID 16640)
-- Name: book_authors book_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(author_id);


--
-- TOC entry 3099 (class 2606 OID 16645)
-- Name: book_authors book_authors_isbn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_isbn_fkey FOREIGN KEY (isbn) REFERENCES public.book(isbn);


--
-- TOC entry 3101 (class 2606 OID 24977)
-- Name: book_loans book_loans_cardid_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_cardid_fk FOREIGN KEY (card_id) REFERENCES public.borrower(card_id);


--
-- TOC entry 3100 (class 2606 OID 16683)
-- Name: book_loans book_loans_isbn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_isbn_fkey FOREIGN KEY (isbn) REFERENCES public.book(isbn);


--
-- TOC entry 3102 (class 2606 OID 16737)
-- Name: fines loanId_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fines
    ADD CONSTRAINT "loanId_fk" FOREIGN KEY (loan_id) REFERENCES public.book_loans(loan_id);


-- Completed on 2019-10-27 16:48:50 CDT

--
-- PostgreSQL database dump complete
--
