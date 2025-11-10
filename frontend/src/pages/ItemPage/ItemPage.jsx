import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ItemPage.css'

const API_BASE = 'http://localhost:8080/api'

export default function ItemPage() {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tab, setTab] = useState('desc')
    const [reserved, setReserved] = useState(false)
    const [qty, setQty] = useState(1);

    const inc = () => setQty(q => q + 1);
    const dec = () => setQty(q => (q > 1 ? q - 1 : 1));

    useEffect(() => {
        const load = async () => {
            try {
                const r = await fetch(`${API_BASE}/items/${id}`)
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                const data = await r.json()
                setItem(data)
            } catch (e) {
                setError('Item not found or server unavailable.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    if (loading) return <div className="container">Loading…</div>
    if (error) return <div className="container error">{error}</div>
    if (!item) return null

    const reserve = () => {
        setReserved(true)
        setTimeout(() => setReserved(false), 2000)
    }



    return (
        <div className="container">

            <div className="breadcrumb">
                {item.category} / {item.brand}
            </div>

            <div className="tei-top">
                <div className="tei-left">
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="tei-hero"
                    />
                    <div className="img-note">
                        Imagine cu titlu de prezentare. Ambalajul poate varia.
                    </div>
                </div>


                <div className="tei-middle">
                    <h1 className="tei-title">{item.name}</h1>
                    <div className="tei-quicklist">
                        <div><b>Brand:</b> {item.brand}</div>
                        <div><b>Gama:</b> {item.category}</div>
                        <div><b>Expiră:</b> {item.expirationDate}</div>
                        <div><b>Vândut de:</b> FarmaConnect</div>
                    </div>

                    <div className="tei-badges">
                        <span className="badge badge-green">{item.prescriptionRequired ? 'Pe rețetă' : 'OTC'}</span>
                    </div>
                </div>

                <aside className="tei-right">
                    <div className="price-lg">
                        {item.price?.toFixed(2)} <span className="currency">LEI</span>
                    </div>
                    <div className="stock-row">
                        <span className="in-stock"> ÎN STOC</span>
                        <span className="updated">Actualizat azi</span>
                    </div>

                    <div className="qty-row">
                        <label htmlFor="qty">Cantitate</label>
                        <div className="qty-box">
                            <button type="button" onClick={dec}>−</button>
                            <input
                                id="qty"
                                value={qty}
                                readOnly
                                aria-label="Cantitate"
                            />
                            <button type="button" onClick={inc}>+</button>
                        </div>
                    </div>

                    <button className="btn-green" onClick={reserve} disabled={reserved}>
                        {reserved ? 'Rezervat ✅' : 'Rezervă'}
                    </button>


                </aside>
            </div>


            <div className="tei-tabs">
                <div className="tab-bar" role="tablist" aria-label="Detalii produs">
                    <button className={`tab ${tab==='desc'?'active':''}`} onClick={()=>setTab('desc')} role="tab">Descriere</button>
                    <button className={`tab ${tab==='spec'?'active':''}`} onClick={()=>setTab('spec')} role="tab">Specificații</button>
                    <button className={`tab ${tab==='info'?'active':''}`} onClick={()=>setTab('info')} role="tab">Informații utile</button>
                    <button className={`tab ${tab==='prospect'?'active':''}`} onClick={()=>setTab('prospect')} role="tab">Prospect</button>
                </div>

                <div className="tab-panel">
                    {tab === 'desc' && (
                        <>
                            <h3>{item.name}</h3>
                            <p className="lead">{item.description}</p>
                            <h4>Reacții adverse</h4>
                            <p>{item.sideEffects}</p>
                            <h4>Date produs</h4>
                            <ul className="bullets">
                                <li><b>Fabricat:</b> {item.manufacturingDate}</li>
                                <li><b>Expiră:</b> {item.expirationDate}</li>
                                <li><b>Prescripție:</b> {item.prescriptionRequired ? 'Necesită rețetă' : 'Fără rețetă (OTC)'}</li>
                            </ul>
                        </>
                    )}

                    {tab === 'spec' && (
                        <ul className="bullets">
                            <li>Brand: {item.brand}</li>
                            <li>Categorie: {item.category}</li>
                            <li>Cod produs: {item.id}</li>
                        </ul>
                    )}

                    {tab === 'info' && (
                        <p>Informații generale: nu depășiți doza recomandată. A nu se lăsa la îndemâna copiilor.</p>
                    )}

                    {tab === 'prospect' && (
                        <p>Prospectul oficial poate fi consultat în farmacie sau pe site-ul producătorului.</p>
                    )}


                </div>
            </div>
        </div>
    )
}
