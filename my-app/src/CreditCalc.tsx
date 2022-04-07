import './CreditCalc.css';
import LoanJS from "loanjs";
import { useState } from "react";

export default function CreditCalc() {
    const [values, setValues] = useState({
        "kredi-tutarı": 1,
        "faiz-oranı": 2,
        "kredi-vadesi": 3,
    });
    const [installments, setInstallments] = useState([]);
    
    const handleInputChange = (event: any) => {
        const { name, value} = event.target;

        setValues({
            ...values,
            [name]: value
        });
        console.log(values);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        calculate(
        values["kredi-tutarı"], 
        values["kredi-vadesi"], 
        values["faiz-oranı"] 
        );
    };

    const calculate = (amount: number, years: number, rate: number) => {
        var loan = new LoanJS.Loan(amount, years, rate);
        setInstallments(loan.installments);
        console.log(installments);
    };

    const amountFormat = (amount: number) =>
    new Intl.NumberFormat("en-US",{
        style: "currency",
        currency: "USD"
    }).format(amount);
    return (
    <div className='credit-calc-container'>
        <h1>Kredi Hesapla</h1>

        <form onSubmit={handleSubmit}>
            <div className='form-item'>
                <label htmlFor='kredi-tutarı'>Kredi Tutarı</label>
                <div className='form-input'>
                    <input 
                    type="number"
                    name="kredi-tutarı"
                    placeholder="0" value={values["kredi-tutarı"]} onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='form-item'>
                <label htmlFor='faiz-oranı'>Faiz Oranı</label>
                <div className='form-input'>
                    <input 
                    type="number"
                    name="faiz-oranı"
                    placeholder="0" value={values["faiz-oranı"]} onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='form-item'>
                <label htmlFor='kredi-vadesi'>Kredi Vadesi (Ay)</label>
                <div className='form-input'>
                    <input 
                    type="number"
                    name="kredi-vadesi"
                    placeholder="0" value={values["kredi-vadesi"]} onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='form-action'>
                <input 
                type="submit"
                value="Hesapla" 
                className='calculate-button'
                />
            </div>
        </form>

        {!!installments?.length && (
        <table>
            <thead>
                <tr>
                    <th>Ay</th>
                    <th>Ödeme Tutarı</th>
                    <th>Ödenen Faiz</th>
                    <th>Ödenen Borç</th>
                    <th>Kalan</th>
                </tr>
            </thead>

            <tbody>
                {installments.map((i: any, ind: number) =>( 
                <tr key={ind}>
                    <td>{ind}</td>
                    <td>{amountFormat(i.installment)}</td>
                    <td>{amountFormat(i.interest)}</td>
                    <td>{amountFormat(i.capital)}</td>
                    <td>{amountFormat(i.remain)}</td>
                </tr>
                ))}
               
            </tbody>
        </table>
        )}
    </div>
  )
}
