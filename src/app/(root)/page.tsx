import Banner from "@/components/home/Banner";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import NewArrivals from "@/components/home/NewArrivals";
import ReaderReviews from "@/components/home/ReaderReviews";

export default function Home() {
  return (
    <main>
      <Banner />
      <NewArrivals />

      {/* Other home page sections */}
      <HowBorrowingWorks />
      <ReaderReviews />
    </main>
  );
}
