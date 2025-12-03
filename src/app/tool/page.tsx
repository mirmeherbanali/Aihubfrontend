"use client";
import React from "react";
import styles from "../../components/ui/style/Tool.module.scss";
import { ArrowRight, Users, Target, TrendingUp, Globe, Star, Eye, CheckCircle } from "lucide-react";
import Link from "next/link";

const Tool = () => {
  return (
    <div className={styles.design5}>
      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Add Your Tool to <span className={styles.highlight}>Allisted</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Reach thousands of professionals, students, and businesses looking for AI solutions.
              </p>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <Users size={24} />
                  <div>
                    <div className={styles.statNumber}>5,000+</div>
                    <div className={styles.statLabel}>Active Users</div>
                  </div>
                </div>

                <div className={styles.stat}>
                  <Eye size={24} />
                  <div>
                    <div className={styles.statNumber}>50K+</div>
                    <div className={styles.statLabel}>Monthly Views</div>
                  </div>
                </div>

                <div className={styles.stat}>
                  <TrendingUp size={24} />
                  <div>
                    <div className={styles.statNumber}>300%</div>
                    <div className={styles.statLabel}>Avg. Growth</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroImage}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
              </div>
            </div>
          </div>

          {/* CTA SECTION FIXED */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <h2>Ready to Join?</h2>
              <p className={styles.ctaText}>
                Create a Developer Account to add your tool and start reaching thousands of users.
                 Create a Developer Account to add your tool and start reaching thousands of users
                 
              </p>

              <div className={styles.ctaButtons}>
                <Link href="/auth/login" className={styles.primaryCta}>
                  Create a Developer Account
                </Link>
              </div>

            </div>
          </div>

          {/* FEATURES SECTION */}
          <div className={styles.featuresSection}>
            <h2>Why List Your AI Tool with Us?</h2>

            <div className={styles.featuresGrid}>
              {[
                { title: "Maximum Visibility", description: "Gain visibility among your target audience" },
                { title: "Quality Leads", description: "Connect with decision makers and influencers" },
                { title: "Analytics Dashboard", description: "Track performance with real-time insights" },
              ].map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <CheckCircle size={20} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Tool;
