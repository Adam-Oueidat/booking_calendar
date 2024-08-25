import BookingTrainForm from "@/src/components/BookingTrainForm";
import Calendar from "@/src/components/calendar/Calendar";

export default async function CalendarPage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-center w-full h-screen min-h-screen mr-24 p-8 pb-20 gap-16 sm:p-20">
      <div className="md:flex lg:space-x-40 min-[320px]:flex-col">
        <div className="grid gap-5">
          <h1 className="text-white text-4xl font-semibold text-center">
            Tågbiljetter
          </h1>
          <p></p>
          <BookingTrainForm />
          <div className="w-60">
            Använd kalendern för att boka in dagar du vill besöka, ansökan
            kommer skickas till oss sen kan vi acceptera om det funkar eller
            inte.
          </div>
        </div>
        <Calendar />
      </div>
    </div>
  );
}
