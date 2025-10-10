import AdminShipmentCards from '@/components/AdminUserCards';
import AdminRevenueCards from '@/components/AdminDepositCards';
import AdminServiceCards from '@/components/AdminWithdrawalCards';
import ChartTwo from '@/components/ChartTwo';

export default function Admin() {
  return (
    <>
      <AdminShipmentCards />
      <AdminRevenueCards />
      <AdminServiceCards />

      <div className="w-full mb-4">
        <ChartTwo />
      </div>
    </>
  );
}
