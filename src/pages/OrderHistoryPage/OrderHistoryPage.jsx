import { checkToken } from '../../utilities/users-service'

export default function OrderHistoryPage() {

  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate.toLocaleDateString())
  }
  
    return (
      <>
      <h1>NewOrderPage</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
      </>
    );
}
