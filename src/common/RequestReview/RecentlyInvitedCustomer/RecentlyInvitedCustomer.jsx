import { formatDate } from "@/common/FormatDate/FrormateDate";

const RecentlyInvitedCustomer = ({ requestForReviewData }) => {
  return (
    <section className="overflow-y-auto">
      <h3 className="subheading text_primary mt-3 sm:mt-6">
        Recently Invited Customer{" "}
        <span className="font-normal text_secondary">({requestForReviewData && requestForReviewData?.length} Found)</span>
      </h3>
      <div className="mx-auto bg-white rounded-md shadow-sm mt-6 p-6">
        <div className="overflow-y-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-6 md:py-3 text-start content text_black uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="text-center px-6 py-3  content uppercase text_black tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-right px-6 py-3 content uppercase text_black uppercase tracking-wider"
                >
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requestForReviewData &&
                requestForReviewData?.map((user, index) => (
                  <tr key={index}>
                    <td className="md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                      {user?.reciverId?.email}
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user?.reviewStatus}
                    </td>
                    <td className="text-right px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:block">
                      {formatDate(user?.createdAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default RecentlyInvitedCustomer;