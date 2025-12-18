import { useState, useRef, useEffect } from "react";
import logo from "../assets/NUPSGLOGO.svg";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  // refs for the dropdown container and hamburger button
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close dropdown when clicking outside, excluding the button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <div className="w-full bg-slate-50 py-4 border-b flex items-center">
        <div className="w-[90%] md:w-[70%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <Link to="/">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDxUPDg8QFRUVFxgXFhUVFRYWFhYVFhUXGBYWFRYYHSkgGBolHhUVIjIhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGy0lICUtLS0rLy0tLy0rLS0tLy0tLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPEA0gMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcBBAUDAgj/xABQEAABAwIDAgYMCQkHBAMAAAABAAIDBBEFBiESMQcTIkFRcRQXMjRTYXOBkZOx0jM2QlJicqGysxUWIyQ1VILD0UNkg5KiwcJjlKPhJXTi/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAIDAQQFBgf/xAA9EQACAQIBBgoJAgcBAQAAAAAAAQIDEQQFEiExQVETFDI0YXGBkbHwBhYiM1KSocHRFeEjJENiY3LxNZP/2gAMAwEAAhEDEQA/ALxQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAQfhWzDV4fTwyUkjWF0ha4lodydgncepbmCoxqzaluIydkRyKqzq5oc1jCCAQbQbiLj5S2HHBryyPtH3x+d/Bs9FP7yWwW/wAR7Rjj87+DZ6Kf3ktgt/iPaHH538Gz0U/vJbBb/Ee0Z4/O/g2ein95LYLf4j2jHH538Gz0U/vJbBb/ABHtDj87+DZ6Kf3ktgt/iPaHH538Gz0U/vJbBb/Ee0OPzv4Nnop/eS2C3+I9ocfnfwbPRT+8lsFv8R7Rnj87+DZ6Kf3ktgt/iPaHH538Gz0U/vJbBb/Ee0Y4/O/g2ein95LYLf4j2jPH538Gz0U/vJbBb/Ee0OPzv4Nnop/eS2C3+I9ocfnfwbPRT+8lsFv8R7Q4/O/g2ein95LYLf4j2jHH538Gz0U/vJbBb/Ee0Z4/O/g2ein95LYLf4j2jHH538Gz0U/vJbBb/Ee0bGRczYxLirqHEJG8hjy9gYwEPGwRym79HKOJoUo0lOntZmLd7MtFc0mEAQBAEBWXDv3lD5U/huXRyb7x9RCeoZ+zVXYdBQ9iPjaJIjt7bNvuWx2tqLd0UwtCFWU8/Y/yJNo4MecM2uaHNp3FpFwRRuIIO4g31CveHwi2/UjeR9fnZm/92f8A9m7+qcBhN/1F5HjVZ1zVCwyTRFjG9099I5rRzaknRZjhsLJ2T+ozpGh20Mc8NT+oHvKfEaG594z2Z7aGOeGp/UD3k4jQ3PvGex20Mc8NT+oHvJxGhufeYz2Y7aGOeGp/UD3k4jQ3PvM57M9tDHPDU/qB7ycRobn3mM9jtoY54an9QPeTiNDc+8znsdtDHPDU/qB7ycRobn3jPY7aGOeGp/UD3k4jQ3PvGex20Mc8NT+oHvJxGhufeM9jtoY54an9QPeTiNDc+8Z7HbQxzw1P6ge8nEaG594zmO2hjnhqf1A95OI0Nz7xnsdtDHPDQeoHvJxGhufeM9n0eEzHvCRf9v8A+04lh/LGdI+TwoY54WD1H/6TiNDc+8Z7O1kjhAxWrxGCmnlhMby/aDYg06RucLG+moCpxGEpQpOUU79ZmMm2beW/jXV9Un3YlCtzSHneFyi2FzCwIAgCAICs+HfvGHyp/Dcuhk33j6iE9Rw+GDvfDvJP+5Er8Byp9f5MT2FqZWP6hTeRj+4FzK3vJdZNajqKsyedRAyRjo5GhzXAtc06ggixBWU2ndA/O+esrPwyqLAHGCS7oXnXTnjcfnN+0WPSu9hq6rQvtWv8lMlYjq2DAQBAEAQBAEAQBAEAQFqcEuTL2xKrZ/8AXjI5jvmcDzn5I6LnnFuZjsT/AE49v4JwjtLWMLPmN9AXMuyw+TSxeDZ/lCZzBD8yRMbjWFhrWi5qToAN0Pi61t0m3QqdniRetEdyz8aqvqk+7Er63NIed5FcothcwsCAIAgCArTh27xh8qfw3LoZN94+ohPUcLhe72w7yT/uRK/AcqfX+TE9haWUz+oU3kY/uhcyt7yXWTWo6yrMhAcnM+Aw4jSvpptL6teO6Y8dy9vUebnFwraNV0pqSMNXPzli+GTUk76aoFpIzY23EHuXt+iRqP8A0vQU5qcVKOplLVjUUgYQGUAQBAEAQBAEBMeDbJ35Sm46dp7GidyuiV414sdLRptejpWpi8TwUbR1v6Eoq5fjQALAWA3BcMtMoAgINmd3/wA/hTfo1R/8YC3aPNqnYRfKRwMsfGqr6pPZErq3NIed5FcothcwsCAIAgCArTh27xh8qfw3LoZN94+ohPUcPhcH6thvk3fciV+B5U/O8xPYSngpzYyrpxRyWbNA0ADmkiGge3xjcR1HnWtjcO4Sz1qZmLuT5aJMIAgIXwl5PGIwcbC0dkxA7B8I3eYifHrboPWVuYTEcFKz1PzcjKNyhOsEEaEEWII0IIO4g6WXbKjKAIAgCAIAgCA7GU8uz4lUtp4uS0WdLJzRx31PjcdwHT4gqq9aNKOc+wylc/RmGYfDSwsggYGsYLNA9p6Sd915+c3OTk9ZcbSiAgCAqubMENdmakbBqynE0e3fR73RuLtn6I2QL85v5+mqLp4WV9tiF7yPPK/xqq+qT2RJW5pDzvMLlFsLmFgQBAEAQFa8O3eEXlf5b10Mm+8fUQnqOFwt97Yb5N33IlfgeVPzvMT2Ff0FbNTysngeWSMN2u8fQRztO4joW/KKknGWogforJ2ZYcTphPHo4cmWO+rH21HUd4POF5+vRdKea+wuTud1UmSP4xnLD6OYwTveHgAkCNzhZ2o1AVM68IOzOlhsk4nE0+EppW60jS7Y2E+El9VJ/RR41T8o2P0DG7l8yKx4QvyfVTiqw9x2n/DRuY5gJtpI0kWvzEc+h6V0sJlajCObUb6ND7iqfo9jtkV8yIn2FL0D0ra/WMJ8T+VkPV7KHwx+ZDsKXoHpT9YwnxP5WPV7KHwx+ZDsKXoHpT9YwnxP5WPV7KHwx+ZDsKXoHpT9YwnxP5WPV7KHwx+ZDsKXoHpT9YwnxP5WPV7KHwx+ZDsKXoHpT9YwnxP5WPV7KHwx+ZDsKXob6U/WMJvfyser2UPhj8yLdydmDA8MphBHJI555UsnEvvI/p3bhuA5guTXyhGtPOfZoLl6P41Lkr5kSbDM74dUzNghkkL3khoMbwDYE7yOgFVxxEJOyK6+R8VQpupNKy16USRXHLCAq/hYzrxYdh1I8iQj9O9p1jadeLB5nuG/oB6SF0sFhr/xJathCUthCOC8WximA/6n4L1uYz3MuzxIR1kvyr8aavqk9kS1K3NIed5JcplsLmFgQBAEAQFa8O3eEXlf5b10Mm+8fUQnqOFwt97Yb5N33I1fgeVMxPYVwugQOzlHMUuG1QqI7lp5MsfhI/eG8HrHOqa9FVYZr7DKdmfovDMQhqoWVEDw6ORoc1w6D0jmI3EcxC4E4OEnGWtFydyoOE39qSfUj+6Vy8T7x9h7zIXMo9bIsqDrhAEBL8g5YpsQEpqDKOLLQ3Yds7xrfTVbFClGpe5xMsZRrYNw4O2m+tXJd2ssN+fU+sHurY4rDpOL6xYvdHu/cdrHDfn1PrB7qcVh0j1ixe6Pd+5FM/5WpcPZC6nMpMjnNdtu2tA24tpotevSjTtY7OR8pVsZKaqW0JalbaQ1a53AgCA7uRP2pTfWd+G9W0PeI52V+ZVepeKL1XUPnpDeEfOIw6Di4SDUyg7A3hjeeVw6BzDnPnW3hMNwsrvUvNiMpWKEe9ziXPcXOcSXOOpc4m5JPSSu5a2hFRJ+DD9sU3+J+E9a2M9xLs8TMdZLsq/Gmr6pPZEtSvzSHneSXKZbC5hYEAQBAEBWvDr3hF5X+W9dDJ3vH1EJ6jhcLfeuG+Td9yNX4HlTMT2FbroEAgJvwZZxNBP2PO79WlOpP9lIdz/qHcfMelaeMw3CRzo619SUZWN7hMIOJyEeDi+6V5LE+8fYfQchcyj1si6oOuEAQFlcDu6p+sz2FbuE2nlfSXXT6mWQtw8sEBXfDH8FTeUf9xaeL1RPT+jXLqdS8SsVpHrAgCA7uRP2pTfWd+G9W0PeI52V+ZVepeKLazdmODDaYzy6uPJjjvrI+2jR4ucnmC7VCjKrLNR88bsfnXE8Qnqp31FQ/akkN3HmA5mtHM0bgP8Ae678IRhFRjqKXpNZSBKOC/8AbFN/ifhPWtjPcS7PEzHWS7Kvxpq+qT2RLUr80h53klymWwuYWBAEAQBAVrw7d4ReV/lvXQyb719RCeo4XC33thvk3fcjV+B5UzE9hXC6BAIDBCA7VPVSSsaZHFxa0RgnfsMuGgnnsNLryOV4qOLlbcvA996Ov+Qj/tLxPtc07gQBAWVwO7qn6zPYVu4TaeV9JddPqZZC3Dyx5vnYNm72jaNm3I5R32HSdChi6K/4Yvgqbyj/ALi08Xqieo9GuXU6l4lYrSPWBAEB1cqVsVPXQ1Ezg2OMvc53QOLcPOSSBZX4WLnWjFa2c3LDtgavUvFHHzbmObE6k1Eo2Wi7Yo734tl9x+kbAk9Q5l7OhRVKOau0+cN3OMrjAQEo4L/2xTf4n4T1rYz3EuzxMx1kuyr8aavqk9kS1K/NIed5JcothcwsCAIAgCArXh17wi8r/Leuhk33r6iE9RwuFvvbDfJu+5Gr8DypmJ7Ct10CAQGUB08O+D859q8lljnb6o+B770c5hH/AGl4myuYdwIAgLE4KKZksVVG++ySy4Di24sdLg3stzCbTynpOk+DT3M15859gvrMPs4NYyRtO4vMpZLsclu2RfYJItfudRutbYzrXR4aWKVNyg+w98v41RRkYjWuMcccbIaON2rtlrbTSMjaTq52m10N3omtbJU6sEs+WhakePCJjEdbR0tREyVrTI+3GN2SRsaOGpuD0rXxTuos9l6LVFOVRrcvEgS0z2AQBAeNZ8G7qW9k3ndPr+xzMtcwq9X3OSvZHzgIAgJRwYftim/xPwnrWxnuJdniZjrJdlX401fVJ7IlqV+aQ87yS5TLYXMLAgMIDKAICtOHbvGLyp/Dcuhk33j6iE9Rw+FvvbDfJu+5Gr8Dyp+d5iewrddAgZQGEB18HZtBjN20/Zv0bT7X+1eTyxzt9UfA956PyzcnJ7nN9zLO7Vf98Pqx/Va/FOk0/WX/AB/Udqv++H1Y/qnFOkz6y/4/qO1X/fD6sf1TinSPWX/H9TcpI6LL0b+yalzzORssYzlnZFiQAd2u82VtOmqWt6ziZYyxHE5rlG1r7bleZhjop4zWUgbC3jAwU7nfpHNtfj9SS8ucSDbds9N1LpR5TEKE458dHRt6za4PGxdkl9VRieC2w6R0fGMgO8ONwQBrr0A33XRWvqM4O125q68Czsy5OirIYYYXiFkRcWhrbizhuAvoFirRz0lqsetyXlBYFyaje63ke7Vf98Pqx/VU8U6Tsesv+P6jtV/3w+rH9U4p0j1l/wAf1Har/vh9WP6pxTpHrL/j+pXeYKTiHzQ7W1xbi3ata9ueynk9ZuMgun7HQylV4XJc6lrXin9SPr2J8+CAICUcGH7Ypv8AE/CetbGe4l2eJmOsl2V/jTV9UnsiWpW5pDzvJLlMthcwsCAwgMoAgK04du8YfKn8Ny6GTfePqIT1HD4XO9sN8m77kSvwPKn53mJ7CuF0CAQBAdnAe6i8q38QLyeV+ePqie6yD/5n/wBPufpVWnjAgCA5OJ4dRt26uWASPa06lu28gDRjB4/mjedd6w0tZVOMdMmrlYZkwuqlgNXih4k3MVJSRMZdr3HkNuNC02udSercqne12aFalKSzp9iPrI8FbSwTVEG258MtqilI2myw7NrxWBvICJACNDs2WVfWMLGUIt9OldBbtJJG+NjorbBaC227ZI06tFadOLTWg9kMhAEB+es599VXlHLXwPPo9b8D2uK/8Z/6LxIsvXngwgCAk/Bh+2Kbrk/BetbGe4l2eJmOsl+V/jVV9UnsiWpW5pDzvJLlFsLmFgQBAEAQFZ8O/eMPlT+G5dDJvvH1EJ6jicLve+G+Tf8AciV+B5U/O8xPYVwugQMIDKA7OA91F5Vv4gXk8r88fVE91kH/AMz/AOn3P0qrTxgQBAEBGMfwl9TXQSSC0FK102u58x7gb/k7O1fxhRau0UVIOU03qWk0eDGBzqSOrLiduMsI+pUTuDvPxh9CxDSrleFTcVN+dLJo1oAsAAOgKZtmUAQBAfnrOffVV5Ry18Dz6PW/A9riv/Gf+i8SLL154MIAgJPwY/tim65PwXrWxnuJdniZjrJfln41VfVJ7IlqVuaQ87yS5TLYXMLAgMIDKAICsuHfvKHyp/Dcujk33j6iE9RxuF/4DDvJP+5ErsBrn53mJ7Ct10CAQBAdbB5NkMfa+y8Ot07LwbfYvJ5Y54+qPge89H452Tc3e5rvbLY7alN+6VHpj95VcbhufntOZ6t1/jj9fwY7alN+6VHpj95ONw3Pz2mfVqv8cfr+DLeFOl56Wo9MZ/5LHG47n57R6tV/jj9fwSLK2aYcRDzFHIziyAdvZ1v0bJKupVlUvZHNyhk2eCcc9p33X+5sZsquJw+pk+bDJbrLCB9pCsk7Js5VZ2py6jn8G0BZhNMD8wn/ADOJ/wB1GCtFEMMv4aNnNOZocOax0scj+MJaAzZ0IF9dohRq1VTtc6+T8nTxspKDStvI6eFOk5qWp/8AGP8AkqeNx3M6fq1X+OP1/BjtqU37pUemP3lnjcNz+n5Hq3X+OP1/BjtqU37pUemP3k43Dc/p+R6tV/jj9fwVnmKrE8k8zQQJHFwBtcA8xss5PedjIPp+x1so0nSyVOm9ail9SPL2B8/CAICTcGR/+YpeuT8F618Z7iXZ4mY6yYZa+NdX1SfdiWnW5pHzvJLlFsLmFhhAEBlAEBWXDx3lB5U/huXRyb7x9RCeo43DD8Fh3kn/AHYldgNc+z7mJ7Ctl0CBlAYQHUw74Pzn2ryWWOdvqj4HvvRzmEf9peJsrmHcCAICxuCWdkcdS+R7WtBZdziAByTvJW5hNp5T0maTp33M9c0ZjlxOimgw6jmkY52wZrsAIa4FxYza2iNN9hvWw5ZysjxVaq6kGoK5IcnY5SvgbTEcRLA1sb4ZC0PFgLEa8pp5iFOMlqLqM45ubqscHhj+CpvKP+4tXF6onrvRrl1OpeJWK0j1gQBAeNZ8G7qW9k3ndPr+xzMs8wq9X3OSvZHzgIAgJLwaftil+tJ+C9a+L9xLs8TMdZMcufGuq6pPuxLTrczj53klyi2FzCwIDCAygCArbh0iJoInfNm9rHBdDJztV7CE9Rw+Fb9JQ4bONxYRf60bT/xV2C0VJxMS1IrZdEgEAQHTw74Pzn2ryWWOdvqj4HvvRzmEf9peJsrmHcCAICxOCikhmjqGTRskbtMOy9ocLgGxsdLrcwm08n6TxjJ0s5X1k2dlbDCdrsKmB6Wxtb7AtzNW48nwNNakjP5sYZ+40mn/AEY/6JmrcOBp/Cu4iHC+wNhpWtFgHuAHi2FqYvVE9X6Mq06nUvErNaR60IAgPGs+Dd1Leybzun1/Y5mWeYVer7nJXsj5wEAQEs4KoS/GICPktkcf8hb/AMlq412ovsJR1kqygeMzPWSDcBJ/Lb/stWvowsF52mVymWwuYWBAYQGUAQEN4XKPjcImI/siyXzMeNr/AEly28FK1aPTo7yM9RDcT/XMqwSjV1M4Nd4uLeYnX/hIPnW3D2MW1v8AvpI64larokAgCA6eHfB+c+1eSyxzt9UfA996Ocwj/tLxNlcw7gQBAWVwO7qn6zPYVu4TaeV9JddPqZZC3DywQFd8MXwVN5R/3Fp4vVE9P6Ncup1LxKxWkesCAIDxrPg3dS3sm87p9f2OZlrmFXq+5yV7I+cBAEBYvArSDsmoqnaNii2drmBcdp1/MwFc/KEvZjHeycDf4FQaiqrq47nkAdcj3yH7CxQyh7MYU93/AAQ2stpcssCAwgMoAgNbEqNs8EkDxdsjHMPU5pB9qzGTi01sBVHBbGHR1+CVXytvQ+McVIQP4WO866mMemFePnaVx2orWqpZIJHwyiz43FjutptfqO/zroqSklJamQPNZAQHUoGOEbbgja5Tbi12kmzh0g23ryWWH/Ny6o+B770c5hH/AGl4mwuYdwIAgJjwfZlpaATCoL+WWluy0u3DW9ty2KFWNO9zh5ZydWxbhwVtF73diX9srC+mb1blscap9PccT1exnR3odsrC+mb1bk41T6e4er2M6O9ET4Qcz0lfHC2nL7se4u2mluhbYWvvWvXqxqJWOzkbJ1bCSm6ttKVrO+0ha1zvBAEBkUks94oWFz3A7LRvdsguIHSbA6LcyfJRxUG95zMs8wq9X3RwWuBFxuK9qfODKwDBKAs+njOF5Zkc7kzVt/EQJhstH8MQv13XNb4bFJLVH7fuT1RJdwTYT2LhcZIs6YmZ38VgweZrWrUxtTPqvo0EoqyJktUkYQBAZQBAEBUHCHBLhWLw4tA0mOQjjGjncBaRv8cdiPpMXVwrVai6Mtezz0PxK5aHc1eFzBml0WLU1nQztaJCNwcR+jf1OHJPjDelSwNTQ6Uta1fcTW0rpdAgSng/yi/E6jlginiIMrvnHeIm+M855h1rWxWIVKOjW9X5JRVy4MVyPh9TJxsjXghrWAMeWtDWCzQAN2i83UoRqSzpazsYXK+Iw1NU6drdRp9rbC+ib1rlDitPyzZ9YMZvXch2tsL6JvWuTitPyx6wYzeu5HFzdlrBMMpjPK2ZzjyY4+NdeR5GjR4ucnmAV1DJ0ass1X6SL9IcYlrXcipTXyfR9G7xLrfo2F6e8r9Y8d/b8v7js6T6PoT9Gwu5949Y8d/b8v7js6T6PoT9Gwu5949Y8d/b8v7js6T6PoT9Gwu5949Y8d/b8v7k/wCDrDsKxJroahsjalguQJHASMv3bBzWuARzadK0MXkunSedG+b16icfSLGPW49xNe1thfRN61y0uK0+nvJ+sGM3ruQ7W2F9E3rXJxWn0949YMZvXcjawvIuH0szKiIS7bCS28hI1BG4+IlSjh4Rd0U4jLOJr03Tnaz16CvOFjJ/Y0hr6Zn6GR36Vo/s5Ce7t81x39B6138FiM9cHLWtRxZRtpK7W+QO/kbLzsRrmQ2/RMtJMeiMHRvW4jZ6to8yoxNbgqbe3Z56DMVdkszjI7GcZhwyD4CA2eRu0sZneZtox43FatD+BQdR63q+35JPS7Fwxsa1oa0WAAAHQBoAuSWH0gCAwgMoAgCA5OaMDjxCkkpZNNocl1rljxqx46irKVR05qSMNXK24P8AENkzZexZosS5sYcdLnV0YJ5j3bD1jmC6OJje2IpdvnxIR+FkIzNl2XDqvsaocdgm7Jg3a2or2Lw3ne0HVvT1hbtGsqsM6Ovd0kWrMv3KFNQxUUTKBzXQ7N2vGpeT3TnH5xN7351wq8puo3PWWq1tB2VUZCA1MVxGGlhfUTuDWMF3H/YDnJ3WUoQc5KMdYbsfnXNmY5sSqTUS3a0XEUd78Wy+4/SOhJ/ovQUKMaUc1dpS3c4ytMBAEAQGxh9dNTTMngeWyRnaafaD0tIuCPGoyipxcZamD9E5OzLDidK2dnJeOTLHfVjxvHjB3g84IXAr0XSnmvsLk7ndVJkIDyqqaOWN0UrQ5jwWuaRcEHQgrKbi7oH5yzJl00uIuoaZwmJcBEGm7+VqI5Oh7ec9AuedegpVs+lny0bylqzsT7EJY8t4UII3NdW1AJLhzO3OfbfsMGjRzm3SVoxTxVbOfJXn6k+Sjs8FGVXUVMaioB4+os431cyPe1pPO43Lj4zbmVGNrqpO0dSMxVidrTJBAEBhAZQBAEAQEC4TslGuYKukBFVEPknZMrWm4aDzPadWnzLdwmJ4N5suS/p52kZRucfAsVpMw0n5OxA7FXGLsfbZcXN0MjOhw3PZ9lt11SnLCz4SnyX5/wCMwnnKzIpQV+KZdrTFI0lhN3Rk/op2c0kR+S77RuI3LalClioXWv6rrI6YsurLWYqXEYeOpn35nsOj43fNe3m69x3hcerRlSlaRYnc6j3hoLnEAAXJOgAG8kqoyUFwjZxOJTCOBx7GiPIGoEr93GuHOPmjz867mEw3BRvLlP6dBVKVyHrbIhAZQBAEAQHayjmObDaps8dyw8mWPmkj94bwfNuJVNeiqsM169hlOx+isNr4amFk8Dw6N4DmuHOD7D4lwJwcG4vWXGy9wAJJAA3k6ADxqIKmzrwkSTu7CwbacXHZMzBdzzu2acf893R0jqYfBKKz63d+fwVuWxHtguFUmXKXs/ELPrJAQxgO04OdqY2HnPO+Txb+nFSpPFTzIclef+Iylm6Wa2RcvVGLVZxnEgSza2omHuXlvcbLfBM5vnEX1584mtGjDgafb53/APDEVd3Zbq5ZYEAQBAYQGUAQGjjmJxUdNLUynkxtLj0k/JaPGSQB4ypQg5yUVtDdis8GznXh7amoqQbzMiqqGSIRvp2SuDYpIT3TwLtuTcHXcuhUw0LOMVsupXve2u5BSZbS5pMrrhByE6d/5Qw0llS07TmtOzxhG5zT8mUdO524rewuKzFwdTTHw/YhKO1HMwbMtFjMIw3GmCOoB2WSEcWTI3S7Sfg5ulh0OotbRXVKM6D4WjpXf/1GE09DI1i2CYrl+pFTA9xjvYTNF43N8HUM+T7Ogg6LYhVpYmObLXu/BhpxNrOnCNJiFKymhjMQe39Y1vtHwbDzsO8nn0HSo4fBqnNybvu/IcrkEW6RCAIAgCAIAgCAmnBrnP8AJ0pgqCexpCSd54qS3dAfNdbUDn16Vp4vDcKs6OtfUlGVjcx/MmJY/OaPD4niDnbu2h8+of8AIb0M5/HuEaVGnho59R6fOr8hty0I7kUGF5Zi4yVwnrXt0Gl7c+yP7KO+9x1Pj3Churi3ZaI+e9ktETQyzlisxyo/KWLl3E/2cVi0Pbe4axp1bD497+m2+davDDx4Ojr2vzt8DCV9LLfjja1oa0AAAAAaAAbgAuUWEAzrmSdtTJTsrBRw08THyShjZJZJZb8XDExwIOgBPOb8y3cPRTipON23oWpW3si2dvIGYpK+lvUsMdTEdieMtLCHWDmu2TqA5pB9PQqsTRVOdo6U9RmLuSZa5kIDCAygCAh2dR2TWUOHfIfIaiUdMdONoA9bywLaoezGdTcrLrf7XIvcc7FqHC8ec9sbjBXUz7DbbsytLHXbtxn4SIkA/wBFZCVXDrTpjLu/6HZnTwrN74pRRYwxtPOdGSjveo8cbz3Lulh1F1VOhdZ9LSvquv8AIvsZL1rEiHZ5yDTYkONYRFUAaSAXD7bmyjnHjGo+xbWHxUqOjWt34IyjchmG5vr8Jk/J+NwulhIs155Ttjpa46TM8XdDxrclh6ddcJRdnu86vAjdrQz3xbg9oq+PszA547HfCTePa5w074nfRNx1LEMZOm8ysu3b+4cb6UVtiVBPSy8TUxPif814tcdLTucPGLroQnGavF3RA11IBAEAQBAEAaCXBrQXOcbNa0EucehrRqSnSCwMtcGE8rePxJ/Y0I5RZcCQtGp2nHSMek9S0auOivZp6X9P3JKG86WKZ6pqRrcOy9Ttc5x2RI1pcC7pjbvld9I6DfqqoYWU/wCJXfn7Gc62hG/lDg2eZezcYeZpidrinHaAdzOld8sjmaOSPHzV18bdZlJWXnzvMqO1lmAAaBc8mR7MebYKR4p4mOqKp/cU0Vi8+N53Rs5y48yvpUJT9p6I72YbscrBMo3q/wAp4sYX1chAjjbpFDsjktYDrI8AHlHzK2eItDgqXJ273+xhLTdntVt7Ex2KRujK6F0b/LU/KYeste4fwlRXt0Gvhf0Y1MmK1SQQGEBlAEBBcxGdmMsMBjbLLQzR07pL7HHNex5Btr3Iv/CtylZ0XfUpJvq0kXrI3j9H2CWRwQveaQCqr6wO4qaQPftOjilO8uLLloNrANHPbYpS4TTJ8rRFa12kXoJEzM1LUxRU2LQNLqx5McAYXmOB1+KfUczHEA6/0JVHAyi3Kk+Tt3vbYlfeZocLr6RgkwWrjqqb5NNO8uDR0Q1AuQPouusSnCbtVVnvX3X4Glajbjz/AE8XJxGmqaN438awui/hmZdpHXZQ4rJ6YNS6tfdrGdvJDX0FLXQbE8bJYngEXHSLhzTvB8YVEZSg7p2ZLWVlinB3iOHTGrwSoeemIm0lh8m55MrfE6xHSulDGQqRzKy7fOrs7itxa1GaThEpakGix+iDSNC7YJaD0vjPLjPjFx1I8HKPt0JDO2M+MR4MKapZ2Rg1YxzTrxb3bbP4ZBym9RB8yzDHSg82rEZm4geN5br6G/ZVNIxo+WBtR9e23QDrst2nWp1OS/yRaaOU1wIuDceJWmDKA2MNoKiqdsUsMkrufYbcD6ztzfOVGc4wV5OwWknmCcE9S8cZiE7IIxqWss6S3jeeSz/UtKplCK0QV2TUN505804BgrTHhsDZ5+5Lwbi/05zcn6rbqpUK+Id6jsvOwXS1GiMEx/MBD61/Y9NcEMLSBbpbDvefG820vZT4ahhtENMt/wC/47xZy1lkZYynQ4ay1PHyyOVK7WR3W7mHiGi59WvOq7yZNJI1MRz1QRSOgiE9RMwlpigic9wcOZx0a3zkKUMNOSznoW96BnI03Mx3EdHluHQHfskS1Th0XtsRdepCl/Bp/wBz7l+WY0s1ocUwTBogaUbYfLxc08dpntkIJDqh19o3PRdTzK1d+1u0LV3C6RD5scllqG18tQx2w4QPkawzileLlklJEN4nbZu0QS11xrYLaVJKOYl07r9b6PAjfaTDG659VUYTtQSQyuqHy8U8tL2xMieC52ybC+0zTx2WpCKhCppurJdtyW4nq0yQQBAEAQHHzNgEdfCGOc6ORjg+GZmj4pBuc0+0c4VlKq6buu1bzDVyMyYu02w7MULGuLm8XUWPY07mG7Dfcx9x3DtOtbCh/UoPrW1ed5i+xnjJlOSjqm1rZZqmFrZaiYOLXyS1IjLIyA1tyCx7xsjkjmAUuMKcMyyT0JdC1+dpi2m5yqXBZsPpqc07nQ1+IyBhDDaKESO46RzYO4BjY3ZGnPZWuqqsnnaYx73s19ItY6Waosw9gz0kkENW2RhY2eA7EgB0u+F2l7X7klV0XQ4RTTtbY/yHex2sIzzheyyCWV1PI0BvF1LHQu0AGhdyT5iVRPDVFpSuujSZzkSmCojkG1G9rh0tII+xa7ViRzsey5Q17dmrgY8juX2s9v1XjUKynVnTd4uxhpMrrEeDCvpH8fg1a9rvmOeY3dW20bL+p48634Y6E1m1o38+dRDMtqPiPhDxfD/0eL0Jc0aF9gwnz6xuv1hZ4pRq6aUvPiM5rWe7KvKGJm72MppXb7t7HcT9dvIf6SsOOLo6tK7x7LMy4PlHDtamVk7t4Y5xmJ6LRM09IRVMXV5Kt9PqLRR5S8KG1+r4Nhx00F2DToIiivYdZCzxG3tVp+e0Z+48GZNzDizg/FKkwxb+LJueoQs5A63ElZ4zQoq1KN3v/fX4DNb1k5y5kPDKCz44RJKN0stnPB+jfRnmAWlVxVSpob0bthNRSJLLMxgu9zWjpJAH2rXMkcxDPmFQu2Gz8dJ4Ona6Z/oYCB5yFfHDVJabWXTo8TGciOYA3HDJVOo6NlPHUzmYSVZ5TAY2NIEUZJJ5N9SBqtipwKUVOV2lbR172RVzq4G+rkNdhVbUGSVrdpkwaGF0U7CAQ0btlwcPMFXUUVmVYLRu6UZW4jWE5ZnmlhpJcOdTiOB9PVzN2GwzNa39Xki2Td0okayQOIBbytVsTrRinNSvd3S2rffotoMJHXkqKHDZRHTQirxOSNrHiFuztubulntyIhfUk6qq06qvJ2gt/gt5nUdzLGXZYpXV1fI2WskGySPg4Y9/Ewg7m9J5yqKtVNZkNEV9elmUiTKgyEAQBAEAQGvX0MNRG6KeNkjHCxa8Ag+YrMZOLugRP82cQw87WD1O1F+51Li+PqilN3R+e4Wzw0KnvVp3rX3amRtbUc+kxWasxukZU0k1O+CCoeY5NkjbcY27Ub2kh4tfUKxwjChJxd7tGL6SxFokyuTmyaSpmosQwpkrYT+lfGWyxxscNtrpQ8acjUrf4ulFThO19Wx9hC+xo+YsHy5K2nmhM1G6qa98IjllgLmsG052y07AAGuvMjniE5J2lbXdJ/uLI3qLCapw28PzFJI3mEggqG25uVa/2qEpxWidO3ejPUzcEOZo902GzfWjliJ87S4fYoXw7+Jdz/A0nnLWZhI2ZcMoJQd+zUmx8z41nMobJvu/caSK4pk+SoJccvNicd5p62OMX6SzuT6FswxGboVXvTZHN6DUoMgyxEF+CPlPRLXRtZ52xkX86lLFt/1LdSYzegl1B+W4WcXS4Ph0DRuHZFh6I41qyVGTvKbfZ+WS07jbMWZpN8uGQ/VZLKR6S0fYo/y6+J9y/I0nwct4pIQKnHJxf5MEUMN+mxsXfas8LSXJh3tsWe84dVQ5WgqBDW1UlRNthhE808wa9xAAkDeQzW3daaq6LxMo3hFJdCS/cx7O06OAZkh7J7Go8NiggjmdBJK98MNpGjRkcQO09xu3zFQq0Xm505XbV1rf1Mpk8WkSIFmfFG0GNQT8VNIZaSWPi4mF73ubJG5gsN3ytToLrdpQ4Sg1dKzWvtIt2ZsGjxvEu+H9gU5/soiH1L29D5RpHfobr41DOpUuSs573q7tvaNLJFgOAUdBHxdLEGX1c7Vz3u53PedXHrVNSrKo7yZlKx01WZCAIDCAygCAIAgCAh2bHdjYnh9a7uCZKV55m8cAYyf4mW84W1R9qnOHb3EXrJitUkV7iWWa+LD8SEYEtTWyuPIIFon7LPlEbmbWi3oV4OpC+hRRBp2ZE8awWTD31Vn1L46eg2IjNctbLVEMcyF1gNkAebXoW1Tqqoo6Fdy023LeYasbmAYHR1GH1fFS4a50dO0NmpWOjmY6zn/p7usTeMWcAL2coVas41I3Utep6V2BLQS7g3iqqiL8qVkznPqWN4uIOPFxxNAtZl7bbiNonzLWxbhF8FBau9slHezjYTm2pmxh/wCsNNLL2RDDEC24fTNB40jfytiS3MQrZ4eMaOr2lZt9flGE9JswZmrvzZdiRlBqA2RweWNtpUOY3k2t3IAUXQhxpU7aNHgLvNuTmGR7qcPvyzGDe3yi297da0mkpWJlMsz1i8lFDtVNphJx0rmsYNql2WEaWsBtOcLj5q67wtKNR6NGpdZVnOx2MYzCfyzLFNWEU73iidAJC17RJCH9kMtqLSWbtDpVNOj/AAE1HTyr9uruMt6TeyNQVAxaaKtm419BC2GFxvtOimO22R197tkNaT4io4mUeBTgrZzu+tGVr0nDz/h8rMSqo4m1ZFRFFPGyCHjWyVEZLWtlNjss2mNJtbersNNOlFu2htO7tZdBiS0nSjypixrXVkdLQCSaOGR0tQNswThtpOJY077gFVOvS4PMbdlfQtq2XM2d7lpRB2yNsgusLkaC9tbeJc59BMiNI7srHpZG6so6fib83HTOD3N6w1gv9ZbEvZoJbW79i0EdpMVrEggCAIAgMIDKAIAgCAIDRxrCoKyB9NUN2mPGtjYgg3BaeYggEHxKUJuElKOsNXI7+amJQd5YzUADcypjZO3q2hsu+0rY4eEuXBdmj8kbPeOMzNDoY8OqR0h0kDj5jtC6x/Ly3ruf4GkOzRiTBapwOptzmGWKYeglp+xZ4Gm+TUXamvyLvcars3YW1r2T4fWQiQWkDqOQB4sRZxY0g6E+lS4Co7NSTt0oXR90uecvMhFKyrZCwM2GtIdGWttawuNLLDw1dvOauM5HHpabKbTA6nr4I3wEkSNkZtyXa5pErnC7hZx6Fc3infOi7PzoMeyeNHl7CG00lI3H3uhfGYxG6aEtZd7X7TQANbg+kqUq1VzU+D09TFlquSDLVXh9A17ZcbbUB2zbjpYuQGgizdnpv9gWvVjUqaqdupMyrLacAUeV44xE/FWG1OaYkSxgmMybd9G90N1+jmV+diW7qG25j2T0lxLKJE7HzNnNRIZJCA979okHkOaLtGg0CxmYrQ7WtoHsnXp83YaJXTUtBXSyOa1jpGUkoLms7kF7wLgeNUuhO1pSVutGbo2vzqxOTvfBKnxGeWKIecAuP2KPA0lrqLsTf4F3uHG5mm3RYdTDpc6Sdw8w2Qn8uvifcvyNJj82MVm77xmYDnbTRRwj/M7aKcNTXJgu13/As953cv4FT0ERhg2ztOc973uLnve43c57jvJVVSpKo7yMpWOmqzIQBAEBhAEBlAEAQBAEAQBAEAQBAfEkTXaOaD1gH2oDTqMJpXAnsWncfpRtses7J9ikpy3sEQxqB0Fz+blLM0fKjfGf9JhBW1TzZf1Guv8A6RfUcrD8T41+zHlZgPSdhoHWXQq2dJJaa3nvMJ9BNsIoCRebDaODxNc2R32RAfatOclsk356ySO1HG1ujWgdQAVRk+0AQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQH//2Q=="
                alt="logo"
                className="w-11 sm:w-11 object-contain"
              />
            </Link>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-8 sm:w-10 object-contain"
              />
            </Link>

            
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 border border-blue-900 text-blue-900 rounded-2xl cursor-pointer hover:bg-blue-100 transition-all duration-200 ">
              About Us
            </button>
            <button className="px-6 py-2.5 bg-blue-900 text-white rounded-2xl cursor-pointer hover:bg-blue-800 transition-all duration-200">
              Our socials
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            ref={menuRef}
            className="md:hidden w-full bg-slate-50/20 backdrop-blur-md p-8 space-y-3 shadow-sm absolute top-16 left-0 z-50"
          >
            <Link
              to="https://nupsgknust.org/about"
              className="w-full px-6 py-3 border border-blue-900 text-blue-900 rounded-2xl inline-block text-center"
            >
              About Us
            </Link>

            <button className="w-full px-6 py-3 bg-blue-900 text-white rounded-2xl">
              Our socials
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
