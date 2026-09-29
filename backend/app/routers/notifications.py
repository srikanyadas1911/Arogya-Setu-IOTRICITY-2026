from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import Notification
from backend.app.schemas import NotificationResponse

router = APIRouter(prefix="/notifications", tags=["Notifications"])

def format_notification(n: Notification) -> dict:
    return {
        "id": n.id,
        "type": n.type,
        "title": n.title,
        "message": n.message,
        "time": n.time,
        "read": n.read
    }

@router.get("", response_model=List[NotificationResponse])
def get_notifications(
    role: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Notification)
    if role:
        query = query.filter(Notification.role == role)
    notifs = query.order_by(Notification.created_at.desc()).all()
    return [format_notification(n) for n in notifs]

@router.put("/{notif_id}/read")
def mark_read(notif_id: str, db: Session = Depends(get_db)):
    n = db.query(Notification).filter(Notification.id == notif_id).first()
    if not n:
        raise HTTPException(status_code=404, detail="Notification not found")
    n.read = True
    db.commit()
    return {"success": True, "message": "Notification marked as read"}

@router.put("/read-all")
def mark_all_read(role: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Notification)
    if role:
        query = query.filter(Notification.role == role)
    query.update({Notification.read: True}, synchronize_session=False)
    db.commit()
    return {"success": True, "message": "All notifications marked as read"}
