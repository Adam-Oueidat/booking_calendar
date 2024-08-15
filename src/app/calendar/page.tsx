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
          <BookingTrainForm />
        </div>
        <Calendar />
      </div>
    </div>
  );
}
