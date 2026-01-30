// pages/about.js
"use client";

import styles from "../../components/ui/style/About.module.scss";
import Image from "next/image";
import { useState, CSSProperties } from "react";
import Link from "next/link";
const pillars = [
  {
    title: "Reviews",
    subtitle: "Built on Trust",
    description:
      "Empowering users to make confident software decisions through authentic, transparent, and community-driven reviews.",
    icon: "🔍",
    color: "#0074D9",
  },
  {
    title: "Recommendations",
    subtitle: "Driven by Data",
    description:
      "Using data, categories, and behavioral insights, Recuip recommends the right software to the right users — saving time and improving discovery.",
    icon: "🎯",
    color: "#39CCCC",
  },
  {
    title: "Recruitment",
    subtitle: "Powered by Opportunity",
    description:
      "The future of software is people. Recuip connects skilled professionals with innovative companies using technology to change the world.",
    icon: "🚀",
    color: "#7FDBFF",
  },
];

const milestones = [
  {
    year: "2022",
    title: "Founded",
    description: "Started as AI tools directory",
  },
  {
    year: "2023",
    title: "Expanded",
    description: "Added review system & analytics",
  },
  {
    year: "2024",
    title: "Evolved",
    description: "Launched recruitment platform",
  },
  {
    year: "2025",
    title: "Vision",
    description: "Become #1 software ecosystem",
  },
];

export default function AboutPage() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <>
     

      <div className={styles.container}>
        {/* Animated Hero Section */}
        <section className={styles.newHero}>
          <div className={styles.newHeroContent}>
            <h1>
              Building the Future of
              <span className={styles.accent}> Software Discovery</span>
            </h1>

            <p>
              A modern ecosystem where innovation meets opportunity — helping
              users find the right tools, developers grow their products, and
              businesses make smarter decisions.
            </p>

            <div className={styles.heroButtons}>
             <Link href="/tool">
              <button className={styles.heroPrimary}>Get Started →</button>
            </Link>
             
              <button className={styles.heroSecondary}>Learn More</button>
            </div>
          </div>

          <div className={styles.newHeroVisual}>
            <div className={styles.glowOrb}></div>
            <div className={styles.glassCard}>
              <h3>10K+ Tools</h3>
              <p>Discover tools trusted by millions</p>
            </div>
            <div className={styles.glassCard2}>
              <h3>50K+ Reviews</h3>
              <p>Transparent & Community Driven</p>
            </div>
          </div>
        </section>
        <section className={styles.features}>
          <div className={styles.featuresContainer}>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📊</div>
                <h3>Analytics Integration</h3>
                <p>
                  Connect Google Analytics to track your software's performance
                  and user engagement in real-time.
                </p>
                <div className={styles.featureHighlight}>
                  Data-Driven Growth
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>💬</div>
                <h3>Direct Communication</h3>
                <p>
                  Request discount codes and connect directly with software
                  developers for personalized solutions.
                </p>
                <div className={styles.featureHighlight}>Human Connection</div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⭐</div>
                <h3>Sponsored Visibility</h3>
                <p>
                  Boost your software's visibility with featured placements and
                  reach thousands of potential users.
                </p>
                <div className={styles.featureHighlight}>Premium Exposure</div>
              </div>
            </div>
          </div>
        </section>
        {/* Mission Statement */}
        <section className={styles.mission}>
          <div className={styles.missionContainer}>
            <div className={styles.missionHeader}>
              <div className={styles.missionBadge}>Our Mission</div>
              <h2 className={styles.missionTitle}>
                Transforming Software Discovery
              </h2>
              <p className={styles.missionSubtitle}>
                Building the most transparent, data-driven ecosystem for
                software innovation
              </p>
            </div>

            <div className={styles.missionContent}>
              <div className={styles.missionStatement}>
                <p className={styles.missionText}>
                  To democratize software discovery by creating the most
                  transparent, data-driven ecosystem where users find perfect
                  tools, developers grow their products, and professionals build
                  meaningful careers. We believe in a future where technology
                  empowers everyone to make better software decisions.
                </p>
              </div>

              <div className={styles.missionVisual}>
                <div className={styles.missionOrb}></div>
              </div>
            </div>

            <div className={styles.missionStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🚀</div>
                <div className={styles.statNumber}>10K+</div>
                <div className={styles.statLabel}>Tools Listed</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⭐</div>
                <div className={styles.statNumber}>50K+</div>
                <div className={styles.statLabel}>Reviews</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📊</div>
                <div className={styles.statNumber}>100+</div>
                <div className={styles.statLabel}>Categories</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>👥</div>
                <div className={styles.statNumber}>1M+</div>
                <div className={styles.statLabel}>Users</div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Grid */}

        <section className={styles.vision}>
          <div className={styles.visionContainer}>
            <div className={styles.visionContent}>
              <h2>
                Our <span className={styles.gradientText}>Vision</span> for the
                Future
              </h2>
              <p className={styles.visionStatement}>
                We envision a world where software discovery is seamless,
                transparent, and accessible to everyone. Where developers can
                focus on building great products while we handle the discovery,
                and professionals can find opportunities that truly match their
                skills and passions.
              </p>
              <div className={styles.visionPillars}>
                <div className={styles.visionPillar}>
                  <div className={styles.visionNumber}>01</div>
                  <h4>Global Reach</h4>
                  <p>
                    Becoming the go-to platform for software discovery worldwide
                  </p>
                </div>
                <div className={styles.visionPillar}>
                  <div className={styles.visionNumber}>02</div>
                  <h4>Innovation First</h4>
                  <p>
                    Continuously evolving with cutting-edge technology and AI
                  </p>
                </div>
                <div className={styles.visionPillar}>
                  <div className={styles.visionNumber}>03</div>
                  <h4>Community Driven</h4>
                  <p>
                    Building the largest and most engaged software community
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.visionGraphic}>
              <div className={styles.futureOrb}></div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.softCta}>
          <div className={styles.ctaInner}>
            <h2>
              Join the <span className={styles.gradientText}>Recuip</span>{" "}
              Ecosystem
            </h2>

            <p>
              Whether you're here to explore, evaluate, or expand — Recuip helps
              you do it smarter.
            </p>
            <Link href="/tool">
              <button className={styles.ctaJoinBtn}>Sign Up →</button>
            </Link>
            {/* <button className={styles.ctaJoinBtn}>Sign Up →</button> */}
          </div>
        </section>
      </div>
    </>
  );
}
