import AdminDepositCards from '@/components/AdminDepositCards';
import AdminUserCards from '@/components/AdminUserCards';
import AdminWithdrawalCards from '@/components/AdminWithdrawalCards';
import ChartTwo from '@/components/ChartTwo';

export default function Admin() {
  return (
    <>
      <AdminUserCards />
      <AdminDepositCards />
      <AdminWithdrawalCards />

      <div className="w-full mb-4">
        <ChartTwo />
      </div>
    </>
  );
}
