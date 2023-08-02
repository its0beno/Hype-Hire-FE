import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  discountRate: number;
};

export function StoreItem({
  title,
  price,
  imgUrl,
  discountRate,
}: StoreItemProps) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="justify-content-between text-center align-items-baseline mb-4">
          <span className="text-center">{title}</span>
        </Card.Title>
        <div className="d-flex justify-content-between">
          <span className="text-danger">{discountRate}%</span>
          <span>{formatCurrency(price)}</span>
        </div>
      </Card.Body>
    </Card>
  );
}
