import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import NewArrivals from "@/components/home/NewArrivals";
import ReaderReviews from "@/components/home/ReaderReviews";

export default function Home() {
  return (
    <main>
      <Banner />
      <Categories/>
      <NewArrivals />
      <FeaturedBooks />

      {/* Other home page sections */}
      <HowBorrowingWorks />
      <ReaderReviews />
    </main>
  );
}
