import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import "./ItemPage.css";

const AlternativesDropdown = ({ selectedItemId }) => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedItemId) return;

        const loadAlternatives = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/items/similar/${selectedItemId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch similar items");
                }

                const data = await response.json();
                setItems(data);
                setSelectedItem(data.find((item) => item.id == selectedItemId))
            } catch (err) {
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

         loadAlternatives();
    }, [selectedItemId]);

    const handleChange = (e) => {
        const item = e.value;
        setSelectedItem(item);

        if (item?.id) {
            navigate(`/items/${item.id}`);
        }
    };

    const itemTemplate = (item) => {
    if (!item) {
        return <span>Alege o alternativă</span>;
    }

    return (
        <div>
            <span className="alternative-name">{item.name}</span>
            <span className="alternative-price">-  {item.price} lei</span>
        </div>
    );
};

    return (
        <Dropdown
            value={selectedItem}
            options={items}
            optionLabel="name"
            placeholder="Alege o alternativă"
            loading={loading}
            onChange={handleChange}
            itemTemplate={itemTemplate}
            valueTemplate={itemTemplate}
            className="alternatives-dropdown"
            panelClassName="alternatives-dropdown-panel"
            emptyMessage="Nu există alternative"
        />
    );
};

export default AlternativesDropdown;
