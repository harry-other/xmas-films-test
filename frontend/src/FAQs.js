import Legals from "./Legals";
import LegalHeader from "./LegalHeader";
import Button from "./Button";
import styles from "./FAQs.module.css";

export default function FAQs() {
  return (
    <Legals className={styles.faqs}>
      <LegalHeader>
        <h1>Frequently Asked Questions</h1>
        <p>
          We're here to help, but please do check some of the questions below
          before you get in touch as they may answer your query. Alternatively
          you can email us by clicking the button below.
        </p>
        <a
          href="mailto:info@tescochristmasmovienights.com"
          className={styles.link}
        >
          <Button solid header>
            Contact Us
          </Button>
        </a>
      </LegalHeader>
      <ul>
        <li>
          <h2>What is Tesco Christmas Movie Nights?</h2>
          <p>
            This festive season, we’re treating you to screenings of the
            nation’s most cherished Christmas films at Cineworld Cinemas
            throughout the UK. It’s our way of saying a big festive thank you
            for being a Tesco customer.
          </p>
        </li>
        <li>
          <h2>How much does it cost?</h2>
          <p>
            Nothing! Tesco Christmas Movie Nights is free to specially selected
            Clubcard members, and all Tesco colleagues.
          </p>
        </li>
        <li>
          <h2>How many tickets can I reserve?</h2>
          <p>You can reserve up to 4 tickets.</p>
        </li>
        <li>
          <h2>Can I bring my family?</h2>
          <p>You can bring up to 3 people – family or friends.</p>
        </li>
        <li>
          <h2>Are food and drinks included with my ticket?</h2>
          <p>
            Yes, a selection of Tesco goodies is included with your ticket.
            There’ll be vegan and gluten-free options, as well as drinks
            suitable for children. All food and drink will be subject to
            availability.
          </p>
        </li>
        <li>
          <h2>
            Will the complimentary Tesco goodies have options for different
            diets?
          </h2>
          <p>Yes a variety of options will be available.</p>
        </li>
        <li>
          <h2>What time should I arrive at the cinema?</h2>
          <p>
            Tickets are first come, first served, so please try and arrive at
            the cinema early to make sure you’re able to get a seat. Unlike
            regular cinema showings, there’ll be <strong>no trailers</strong>{" "}
            and the film will start close to the time stated on your ticket. So,
            please arrive on time to avoid missing the start. We recommend
            arriving at 2:15pm for the matinee show, and 7:15pm for the evening
            show.*
          </p>
          <p>
            *Please note, London Leicester Square Cineworld will be showing The
            Holiday screening at 8:30pm so please arrive at 8:15pm if you are
            attending this site.
          </p>
        </li>
        <li>
          <h2>What do I do when I arrive at my local Cineworld?</h2>
          <p>
            When you arrive at the cinema, please have your QR code ready and
            head to one of the friendly Cineworld team at the tills. Show them
            your QR code ticket and they’ll scan and exchange it for a physical
            ticket. Show your ticket to get your complimentary Tesco goodies to
            enjoy during the film.
          </p>
        </li>
        <li>
          <h2>Will I receive a confirmation email?</h2>
          <p>
            Yes, after you’ve booked your ticket, we'll email you a QR code to
            take to the cinema.
          </p>
        </li>
        <li>
          <h2>What if I don’t receive a confirmation email?</h2>
          <p>
            If you don’t receive an email in your inbox, check your spam folder.
            If you don’t receive any confirmation about your ticket, please
            contact{" "}
            <a href="mailto:info@tescochristmasmovienights.com">
              info@tescochristmasmovienights.com
            </a>{" "}
            for help.
          </p>
          <p>
            We'll be available between 9am-5.30pm, Monday-Friday. We’ll do our
            best to reply within 24 hours, or within 4 hours on the day of the
            film, during our opening times.
          </p>
        </li>
        <li>
          <h2>Which films will I be able to watch?</h2>
          <p>
            Tesco Christmas Movie Nights will be showing a range of Christmas
            classics and an exclusive Wonka screening. Here’s what will be
            showing:
          </p>
          <ul>
            <li>25 November: The Polar Express at 2:30pm</li>
            <li>8 December: Wonka at 7:30pm</li>
            <li>16 December: The Muppet Christmas Carol at 2:30pm</li>
          </ul>
          <p>
            Don’t forget, there won’t be any trailers, so arrive in good time
            for the start of your chosen film.
          </p>
        </li>
        <li>
          <h2>
            Do I need to be a Tesco Clubcard member to enjoy Tesco Christmas
            Movie Nights?
          </h2>
          <p>
            Yes, this event is exclusively for selected Clubcard members and up
            to 3 of their guests.
          </p>
        </li>
        <li>
          <h2>What if I reserved a ticket but can no longer go?</h2>
          <p>
            If you’re unable to go to your chosen film, please cancel your
            tickets by contacting{" "}
            <a href="mailto:info@tescochristmasmovienights.com">
              info@tescochristmasmovienights.com
            </a>
          </p>
          <p>
            We'll be available between 9am-5.30pm, Monday-Friday. We’ll do our
            best to reply within 24 hours, or within 4 hours on the day of the
            film, during our opening times.
          </p>
        </li>
        <li>
          <h2>
            Can I change the Cineworld location after I’ve reserved a ticket?
          </h2>
          <p>
            Please contact{" "}
            <a href="mailto:info@tescochristmasmovienights.com">
              info@tescochristmasmovienights.com
            </a>{" "}
            if you want to change the location of your chosen screening.
          </p>
          <p>
            We'll be available between 9am-5.30pm, Monday-Friday. We’ll do our
            best to reply within 24 hours, or within 4 hours on the day of the
            film, during our opening times.
          </p>
        </li>
        <li>
          <h2>Will there be accessibility options at the cinemas?</h2>
          <p>
            Cineworld Cinemas are committed to offering maximum accessibility
            and they strive to provide facilities that meet the requirements of
            all their customers.
          </p>
          <p>
            The Cinema Exhibitors' Association Card (CEA card) helps Cineworld
            to make sure that reasonable support is made available to you. If
            you require a carer, simply apply for your CEA card by picking up an
            application form from a Cineworld foyer, or apply online at
            <a href="www.ceacard.co.uk">www.ceacard.co.uk</a>
          </p>
          <p>
            Your CEA card will entitle your accompanying carer to a free seat.
            This policy is valid at all times.
          </p>
          <p>
            If you need more details about disabled access, please visit your
            local Cineworld Cinema or call Cineworld Customer Services on 0333
            003 3444, 9am-5.30pm, Monday-Saturday.
          </p>
          <h3>Wheelchair users and guests with restricted mobility</h3>
          <p>
            Cineworld Cinemas are committed to providing wheelchair access at
            all their cinemas, where possible.
          </p>
          <p>
            Below are the cinemas which have less than full wheelchair access or
            restricted access to certain screens. Please contact these cinemas
            directly on the numbers shown for more information.
          </p>
          <ul>
            <li>
              Cineworld Harlow (0330 333 4444) restricted access to the Cafe
              Bar.
            </li>
            <li>
              Cineworld London Leicester Square (0203 750 6806): wheelchair
              access is available in screens 2, 5, 6, and 8 (IMAX). Disabled
              entrance/exit on Leicester Street.
            </li>
          </ul>
          <h3>Sight-impaired guests</h3>
          <p>
            Audio description performances for the sight-impaired are available
            at certain cinemas.
          </p>
          <p>Guide dogs are welcome at all times in all Cineworld Cinemas.</p>
          <p>
            If you need to use a headset, you may be asked to leave a credit
            card or other form of ID while the set is being used.
          </p>
          <h3>Hearing-impaired guests</h3>
          <p>
            Subtitles for the hearing-impaired are available at certain
            performances.
          </p>
          <p>
            Hearing loops (either infrared or induction) are installed at all
            Cineworld Cinemas screens (except at The O2 Greenwich). Please check
            with the box office to see which facility is available.
          </p>
          <p>
            Type Talk calls are also available on the Cineworld telephone
            booking service.
          </p>
        </li>
        <li>
          <h2>Can I share my experience on social media?</h2>
          <p>
            Filming is strictly prohibited during the screenings themselves. but
            we’d love to hear how excited you are before the movie night and how
            much you enjoyed it afterwards.
          </p>
          <p>
            We’ll also be showing a special preview of our Christmas advert.
            This is strictly confidential, so please don’t film this or share
            the details.
          </p>
        </li>
        <li>
          <h2>What if I have a problem with the website?</h2>
          <p>
            Please contact{" "}
            <a href="mailto:info@tescochristmasmovienights.com">
              info@tescochristmasmovienights.com
            </a>{" "}
            for support.
          </p>
          <p>
            We'll be available between 9am-5.30pm, Monday-Friday. We’ll do our
            best to reply within 24 hours, or within 4 hours on the day of the
            film, during our opening times.
          </p>
        </li>
        <li>
          <h2>Will I be guaranteed a seat with my ticket?</h2>
          <p>
            Tickets are general admission, on a first come, first served basis,
            and are subject to availability. Please try and arrive at the cinema
            early to get a seat. The Cineworld team will do their best to get
            everyone seated but they can’t guarantee that a seat will be
            available.
          </p>
        </li>
      </ul>
    </Legals>
  );
}
