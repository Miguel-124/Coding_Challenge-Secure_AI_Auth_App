from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from . import models

def get_challenge_quota(db: Session, user_id: str):
    """
    Retrieve the challenge quota for a specific user.
    """
    return (db.query(models.ChallengeQuota)
            .filter(models.ChallengeQuota.user_id == user_id)
            .first())

def create_challenge_quota(db: Session, user_id: int):
    """
    Create a new challenge quota for a specific user.
    """
    db_quota = models.ChallengeQuota(user_id=user_id)
    db.add(db_quota)
    db.commit()
    db.refresh(db_quota)
    return db_quota

def reset_quota_if_needed(db: Session, quota: models.ChallengeQuota):
    """
    Reset the challenge quota if the last reset date is more than 24 hours ago.
    """
    if quota.last_reset_date < datetime.now() - timedelta(days=1):
        quota.quota_remaining = 50
        quota.last_reset_date = datetime.now()
        db.commit()
        db.refresh(quota)
    return quota

def create_challenge(
        db: Session,
        difficulty: str,
        created_by: str,
        title: str,
        options: str,
        correct_answer_id: int,
        explanation: str = None
):
    """
    Create a new challenge in the database.
    """
    db_challenge = models.Challenge(
        difficulty=difficulty,
        created_by=created_by,
        title=title,
        options=options,
        correct_answer_id=correct_answer_id,
        explanation=explanation
    )
    db.add(db_challenge)
    db.commit()
    db.refresh(db_challenge)
    return db_challenge

def get_user_challenges(db: Session, user_id: str):
    """
    Retrieve all challenges created by a specific user.
    """
    return (db.query(models.Challenge)
            .filter(models.Challenge.created_by == user_id)
            .all())